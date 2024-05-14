

export class CreateDatabase1715637681114 {
    name = 'CreateDatabase1715637681114'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "price" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "userId" character varying, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_game" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "gameId" integer, CONSTRAINT "PK_d2e48621504b5ce1bf7eb57db33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_game" ADD CONSTRAINT "FK_bc34b366acddeb04479ec7f4c78" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_game" ADD CONSTRAINT "FK_65965457eb064a259e8a4b624a6" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order_game" DROP CONSTRAINT "FK_65965457eb064a259e8a4b624a6"`);
        await queryRunner.query(`ALTER TABLE "order_game" DROP CONSTRAINT "FK_bc34b366acddeb04479ec7f4c78"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "order_game"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
