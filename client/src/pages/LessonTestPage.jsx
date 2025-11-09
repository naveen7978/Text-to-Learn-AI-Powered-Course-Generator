// src/pages/LessonTestPage.jsx
import LessonRenderer from "../components/LessonRenderer";

const sampleLesson =  {
    "title": "Derivatives",
    "objectives": [
        "Understand the conceptual meaning of a derivative as a rate of change and the slope of a tangent line.",
        "Be able to calculate derivatives of basic functions using fundamental differentiation rules (e.g., power rule, constant rule).",
        "Identify and apply the limit definition of the derivative to simple functions."
    ],
    "content": [
        {
            "type": "heading",
            "text": "Introduction to Derivatives"
        },
        {
            "type": "paragraph",
            "text": "Calculus is fundamentally about change. Derivatives are one of the two core concepts of calculus, providing a powerful tool to measure how a function changes as its input changes. At its heart, a derivative represents the instantaneous rate of change of a function at a specific point."
        },
        {
            "type": "paragraph",
            "text": "Think of it this way: if you're driving a car, your speedometer tells you your instantaneous speed – how fast you're going at that very moment. This is a real-world example of a derivative. If your position is a function of time, the derivative of your position function with respect to time is your instantaneous velocity."
        },
        {
            "type": "video",
            "query": "What is a derivative in calculus explained"
        },
        {
            "type": "heading",
            "text": "The Limit Definition of the Derivative"
        },
        {
            "type": "paragraph",
            "text": "The formal definition of a derivative builds upon the concept of limits. It allows us to calculate the exact slope of the tangent line to a curve at any given point, which represents the instantaneous rate of change. For a function f(x), the derivative, denoted f'(x) or dy/dx, is defined as:"
        },
        {
            "type": "code",
            "text": "f'(x) = lim (h -> 0) [f(x + h) - f(x)] / h",
            "language": "latex"
        },
        {
            "type": "paragraph",
            "text": "This formula calculates the slope of the secant line between two points (x, f(x)) and (x+h, f(x+h)) and then takes the limit as h approaches zero, effectively shrinking the distance between the two points until the secant line becomes the tangent line."
        },
        {
            "type": "heading",
            "text": "Basic Differentiation Rules"
        },
        {
            "type": "paragraph",
            "text": "While the limit definition is fundamental, using it for every function can be tedious. Fortunately, mathematicians have developed rules for differentiating common types of functions:"
        },
        {
            "type": "paragraph",
            "text": "1.  **Constant Rule**: The derivative of a constant function is zero. If f(x) = c (where c is any real number), then f'(x) = 0. Example: If f(x) = 5, then f'(x) = 0."
        },
        {
            "type": "paragraph",
            "text": "2.  **Power Rule**: If f(x) = x^n (where n is any real number), then f'(x) = n * x^(n-1). Example: If f(x) = x^3, then f'(x) = 3x^2. If f(x) = sqrt(x) = x^(1/2), then f'(x) = (1/2)x^(-1/2) = 1/(2*sqrt(x))."
        },
        {
            "type": "paragraph",
            "text": "3.  **Constant Multiple Rule**: If f(x) = c * g(x), where c is a constant, then f'(x) = c * g'(x). Example: If f(x) = 4x^2, then f'(x) = 4 * (2x) = 8x."
        },
        {
            "type": "paragraph",
            "text": "4.  **Sum/Difference Rule**: If f(x) = g(x) ± h(x), then f'(x) = g'(x) ± h'(x). Example: If f(x) = x^3 + 5x, then f'(x) = 3x^2 + 5."
        },
        {
            "type": "video",
            "query": "Basic differentiation rules explained"
        },
        {
            "type": "heading",
            "text": "Interpretation of the Derivative"
        },
        {
            "type": "paragraph",
            "text": "The derivative has several important interpretations:"
        },
        {
            "type": "paragraph",
            "text": "1.  **Slope of the Tangent Line**: Geometrically, f'(x) at a specific point x=a gives the slope of the line tangent to the curve y=f(x) at that point. A positive derivative means the function is increasing; a negative derivative means it's decreasing; a zero derivative means the function has a horizontal tangent, potentially a local maximum or minimum."
        },
        {
            "type": "paragraph",
            "text": "2.  **Instantaneous Rate of Change**: The derivative represents the instantaneous rate at which the dependent variable (output) changes with respect to the independent variable (input). For instance, if a function describes population over time, its derivative describes the rate of population growth (or decline) at any given moment."
        },
        {
            "type": "mcq",
            "question": "Which of the following best describes the derivative of a function at a specific point?",
            "options": [
                "The area under the curve",
                "The total change in the function",
                "The instantaneous rate of change",
                "The average rate of change over an interval"
            ],
            "answer": 2,
            "explanation": "The derivative specifically measures the instantaneous rate of change of a function at a single point, as opposed to the average rate over an interval or the total change."
        },
        {
            "type": "mcq",
            "question": "If f(x) = 7, what is f'(x)?",
            "options": [
                "7",
                "x",
                "0",
                "1"
            ],
            "answer": 2,
            "explanation": "According to the constant rule, the derivative of any constant function is always zero."
        },
        {
            "type": "mcq",
            "question": "Using the power rule, what is the derivative of f(x) = x^5?",
            "options": [
                "5x^4",
                "x^4",
                "5x^6",
                "1/5x^4"
            ],
            "answer": 0,
            "explanation": "The power rule states that if f(x) = x^n, then f'(x) = nx^(n-1). So, for x^5, the derivative is 5 * x^(5-1) = 5x^4."
        },
        {
            "type": "mcq",
            "question": "What does a positive derivative f'(a) at a point x=a indicate about the function f(x)?",
            "options": [
                "The function is decreasing at x=a.",
                "The function has a local maximum at x=a.",
                "The function is increasing at x=a.",
                "The function is constant at x=a."
            ],
            "answer": 2,
            "explanation": "A positive derivative indicates that the function is increasing at that specific point. A negative derivative indicates decreasing, and a zero derivative indicates a horizontal tangent, often at a local extremum."
        },
        {
            "type": "mcq",
            "question": "The limit definition of the derivative involves taking the limit of the slope of which type of line?",
            "options": [
                "A horizontal line",
                "A tangent line",
                "A secant line",
                "A perpendicular line"
            ],
            "answer": 2,
            "explanation": "The limit definition starts with the slope of a secant line connecting two points on the curve and then takes a limit as these points get infinitely close, transforming the secant line into a tangent line."
        }
    ]
};

export default function LessonTestPage() {
  return <LessonRenderer content={sampleLesson} />;
}
