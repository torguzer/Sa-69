import { ReasonInterface } from "./IReason";
import { ScholarshipInterface } from "./IScholarship";

export interface DataInterface {
    Reason: ReasonInterface[],
    Scholarship: ScholarshipInterface[],
}
