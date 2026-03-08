/**
 * https://leetcode.com/problems/employee-importance/description/
 * 690. Employee Importance
 */
 
 class Employee {
     id: number
     importance: number
     subordinates: number[]
     constructor(id: number, importance: number, subordinates: number[]) {
         this.id = (id === undefined) ? 0 : id;
         this.importance = (importance === undefined) ? 0 : importance;
         this.subordinates = (subordinates === undefined) ? [] : subordinates;
     }
 }

function employeeImportance(currentEmployee: Employee | undefined, employeesMap: Map<number, Employee>): number {
    if (!currentEmployee) {
        return 0
    }

    let subordinatesImportance = 0

    for (let i = 0; i < currentEmployee.subordinates.length; i++) {
        subordinatesImportance = subordinatesImportance + employeeImportance(
            employeesMap.get(currentEmployee.subordinates[i]), 
            employeesMap
        )
    }

    return currentEmployee.importance + subordinatesImportance
}

function getImportance(employees: Employee[], id: number): number {
	const employeesMap = new Map<number, Employee>()

    for (const employee of employees) {
        employeesMap.set(employee.id, employee)
    }

    return employeeImportance(employeesMap.get(id), employeesMap)
};