import Employee from "../model/employee.js";

/**
 * Create a new employee
 * @param {*} req 
 * @param {*} res
 */

export const createEmployee = async (req, res) => {
  try {
    const { name, department, salary } = req.body;

    const newEmployee = new Employee({
      name,
      department,
      salary,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      savedEmployee,
      message: "<==========Employee created successfully==========>",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};

/**
 * Get all employees
 * @param {*} req 
 * @param {*} res 
 */
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      employees,
      message: "<==========Employees fetched successfully==========>",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};


/**
 * Delete an employee
 * @param {*} req
 * @param {*} res
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the employee first
    const employee = await Employee.findById(id);

    // 2. Check if employee exists
    if (!employee ) {
      return res.status(404).json({
        message: "Student not found",
      });
    }






    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee   ) {
      return res.status(404).json({
        message: "Employee not found",
      });
    } 

    res.status(200).json({
      deletedEmployee,
      message: "<==========Employee deleted successfully==========>",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
    });
  }
};
/**
 * Get an employee by ID
 * @param {*} req
 * @param {*} res
 */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      employee,
      message: "<==========Employee fetched successfully==========>",
      data:user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee",
      error: error.message,
    });
  }
};


/**
 * Update an employee
 * @param {*} req
 * @param {*} res
 */
export const updateEmployee = async (req, res) => { 
  try {
    const { id } = req.params;
    const { name, department, salary } = req.body;


        const employee = await Employee.findById(id);


    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        department,
        salary,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      updatedEmployee,
      message: "<==========Employee updated successfully==========>",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating employee",
      error: error.message,
    });
  }
};


