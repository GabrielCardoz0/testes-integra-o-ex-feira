import app from "index";
import supertest from "supertest";
import httpStatus from "http-status";

describe("testando as rotas fruits" , () => {

    it("deve retornar toda a lista de frutas" , async () => {
        const result = await supertest(app).get("/fruits");

        const response = result.body;
        
        console.log(response);

        if(response.length === 0){
            expect(response).toEqual([]);
        } else {
            expect(response).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
          })] )); 
        }
    })


    it("Testando a rota para criar uma fruta com body correto" , async () => {

        const fruit = {
            name: "banana",
            price: 20
        }
        const result = await supertest(app).post("/fruits").send(fruit);

        expect(result.status).toEqual(httpStatus.CREATED)
    })
    
    
    it("Testando a rota para criar uma fruta com fruta já existente" , async () => {
        
        const fruit = {
            name: "banana",
            price: 20
        }
        const result = await supertest(app).post("/fruits").send(fruit);

        expect(result.status).toEqual(httpStatus.CONFLICT);
    });


    it("Testando a rota para criar uma fruta com body inválido" , async () => {
        const fruit = {
            name: "banana",
        }
        const result = await supertest(app).post("/fruits").send(fruit);

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);

    });


    it("testando a rota que recebe a lista fruta por id existente" , async () => {
        
        const resultado = await supertest(app).get(`/fruits/1`);
        
        expect(resultado.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number)
        }));

    });


    it("testando a rota que recebe a lista fruta com id errado " , async () => {
         
        const result = await supertest(app).get(`/fruits/0`);
        
        expect(result.status).toEqual(httpStatus.NOT_FOUND);
    });
});