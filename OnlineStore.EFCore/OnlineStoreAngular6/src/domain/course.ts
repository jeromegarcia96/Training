export interface Course {
    courseID: string;
    courseName: string;
    category: string;
    creditUnit: number;
    creditHours: number;
    instructionID: string;
    room: string;
    studentsInClass: number;
    department: string;
    description: string;
    isLecture: boolean;
    isLaboratory: boolean;
}