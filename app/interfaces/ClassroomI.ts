import User from "#models/user";

export default interface ClassroomI {
    id: number|null,
    maxCapacity: number,
    isAvailable: boolean,
    createdBy: string
}