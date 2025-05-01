import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

	// console.log("Inserting a new user into the database...")
	// const user = new User()
	// user.id = 1
	// user.firstName = "zhang"
	// user.lastName = "zehua"
	// user.age = 25
	// await AppDataSource.manager.save(user)
	// console.log("Saved a new user with id: " + user.id)

	// 批量更新
	// await AppDataSource.manager.save(User, [
	// 	{ id: 4, firstName: 'ccc111', lastName: 'ccc', age: 21 },
	// 	{ id: 5, firstName: 'ddd111', lastName: 'ddd', age: 22 },
	// 	{ id: 6, firstName: 'eee111', lastName: 'eee', age: 23 }
	// ])

	// 删除
	// await AppDataSource.manager.delete(User, 1)
	// await AppDataSource.manager.delete(User, [2, 3])

	// 查询
	// const users = await AppDataSource.manager.findBy(User, {
	// 	age: 23
	// })

	await AppDataSource.manager.transaction(async manager => {
		await manager.save(User, {
			id: 9,
			firstName: 'eee',
			lastName: 'eee',
			age: 20
		})
	})

	console.log("Loading users from the database...")

	const users = await AppDataSource.manager.find(User)
	console.log("Loaded users: ", users)

	console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))