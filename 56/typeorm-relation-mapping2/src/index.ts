import { AppDataSource } from "./data-source";
import { Department } from "./entity/Department";
import { Employee } from "./entity/Employee";

AppDataSource.initialize()
  .then(async () => {
    // const e1 = new Employee();
    // e1.name = "张三 1";
    // const e2 = new Employee();
    // e2.name = "李四1";
    // const e3 = new Employee();
    // e3.name = "王五1";
    // const d1 = new Department();
    // d1.name = "技术部";
    // d1.employees = [e1, e2, e3];
    // await AppDataSource.manager.save(Department, d1);
    // await AppDataSource.manager.save(Employee, [e1, e2, e3]);
    // const deps = await AppDataSource.manager.find(Department, {
    //   relations: {
    //     employees: true,
    //   },
    // });
    // console.log(deps, "---deps---");
    // const deps = await AppDataSource.manager.find(Department, {
    //   relations: {
    //     employees: true,
    //   },
    // });
    // await AppDataSource.manager.delete(Employee, deps[0].employees);
    // await AppDataSource.manager.delete(Department, deps[0].id);
    const deps = await AppDataSource.manager.find(Department, {
      relations: {
        employees: true,
      },
    });
    // await AppDataSource.manager.delete(Employee, deps[0].employees);
    await AppDataSource.manager.delete(Department, deps[0].id);
  })
  .catch((error) => console.log(error));
