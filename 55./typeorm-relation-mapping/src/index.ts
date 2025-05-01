import { AppDataSource } from "./data-source";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    // const user = new User();
    // user.firstName = "zhang1";
    // user.lastName = "zehua1";
    // user.age = 20;

    // const idCard = new IdCard();
    // idCard.cardName = "222";
    // idCard.user = user;

    // await AppDataSource.manager.save(user);
    // await AppDataSource.manager.save(idCard);

    // const ics = await AppDataSource.manager.find(IdCard, {
    //   relations: {
    //     user: true,
    //   },
    // });
    // console.log(ics);

    // const ics = await AppDataSource.manager
    //   .getRepository(IdCard)
    //   .createQueryBuilder("ic")
    //   .leftJoinAndSelect("ic.user", "u")
    //   .getMany();

    // console.log(ics);

    // const ics = await AppDataSource.manager
    //   .createQueryBuilder(IdCard, "ic")
    //   .leftJoinAndSelect("ic.user", "u")
    //   .getMany();

    // console.log("ics", ics);

    // 删除
    // await AppDataSource.manager.delete(User, 1);

    const user = await AppDataSource.manager.find(User, {
      relations: {
        idCard: true,
      },
    });

    console.log(user, "----user----");
  })
  .catch((error) => console.log(error));
