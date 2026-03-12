import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Initialize OpenAI client
// Note: In a production app, you should NEVER expose your API key in the frontend.
// This should be done via a secure backend API route. 
// We use dangerouslyAllowBrowser for this MVP frontend demonstration.
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true
});

// Define the expected output structure using Zod
const QuestionSchema = z.object({
    title: z.string(),
    text: z.string(),
    options: z.array(z.string()).length(4),
    correctOptionIndex: z.number().int().min(0).max(3),
    explanation: z.string()
});

const ExamSchema = z.object({
    questions: z.array(QuestionSchema)
});

export type PracticeExam = z.infer<typeof ExamSchema>;
export type Question = z.infer<typeof QuestionSchema>;

export async function generatePracticeExam(
    courseName: string,
    examType: string,
    focusAreas: string[],
    questionCount: number = 3
): Promise<PracticeExam> {

    if (!import.meta.env.VITE_OPENAI_API_KEY) {
        throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
    }

    const prompt = `
    You are an expert university professor creating a ${examType} practice exam for a course called "${courseName}".
    The student has requested that the exam focus heavily on the following topics: ${focusAreas.join(", ")}.
    
    Generate exactly ${questionCount} multiple-choice questions. 
    They must be challenging, operator-grade, and academically rigorous.
    Provide 4 distinct options per question.
    Also provide the index (0-3) of the correct answer, and a brief explanation of why it is correct.
    `;

    try {
        const response = await (openai.beta as any).chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an elite academic AI tutor." },
                { role: "user", content: prompt }
            ],
            response_format: zodResponseFormat(ExamSchema, "exam_generation"),
        });

        const result = response.choices[0].message.parsed;

        if (!result) {
            throw new Error("Failed to parse the generated exam");
        }

        return result;
    } catch (error) {
        console.error("Error generating exam:", error);
        throw new Error("Failed to communicate with OpenAI. Please check your API key.");
    }
}

// --------------------------------------------------------------------------
// SYLLABUS / CALENDAR PARSER
// --------------------------------------------------------------------------

const AssessmentSchema = z.object({
    title: z.string().describe("Name of the exam, quiz, or assignment"),
    type: z.enum(["EXAM", "ASSIGNMENT", "QUIZ", "OTHER"]),
    weighting: z.number().min(0).max(100).describe("Percentage of total grade"),
    dueDate: z.string().describe("Estimated date or week due (e.g., 'Week 5' or 'Oct 14')")
});

const TopicSchema = z.object({
    name: z.string(),
    weekNumber: z.number().int().optional()
});

const CourseOutlineSchema = z.object({
    courseCode: z.string(),
    courseName: z.string(),
    assessments: z.array(AssessmentSchema),
    topics: z.array(TopicSchema)
});

export type CourseOutline = z.infer<typeof CourseOutlineSchema>;

export async function parseSyllabusContent(rawText: string): Promise<CourseOutline> {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
        throw new Error("OpenAI API Key is missing.");
    }

    const prompt = `
    Analyze the following raw text extracted from a university syllabus, course outline, or calendar.
    Extract the core course identity, all graded assessments (including their weight and deadlines), and the main topics covered.
    
    RAW TEXT:
    """
    ${rawText}
    """
    `;

    try {
        const response = await (openai.beta as any).chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an elite academic data extractor." },
                { role: "user", content: prompt }
            ],
            response_format: zodResponseFormat(CourseOutlineSchema, "course_parse"),
        });

        const result = response.choices[0].message.parsed;

        if (!result) {
            throw new Error("Failed to parse syllabus");
        }

        return result;
    } catch (error) {
        console.error("Error parsing syllabus:", error);
        throw new Error("Failed to communicate with OpenAI.");
    }
}
