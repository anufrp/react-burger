import { API_BASE } from "../../src/services/constants";

describe("Application", () => {
    beforeEach(() => {
        cy.intercept("GET", API_BASE + 'ingredients', {
            fixture: "ingredients"
        });
        cy.visit("/");
        cy.get("[data-testid=ingredient_card]").first().as('ingredient-card');
        cy.get("[id=modalRoot]").first().as('modal');
    })

    

    it("should show modal with ingredient info after click on it", () => {
        cy.get("@ingredient-card").click();
        cy.get("@modal").should("contain.text","Детали ингредиента");
        cy.get("@modal").should("contain.text","Краторная булка");
    });

    it("should show close modal on click close button", () => {
        cy.get("@ingredient-card").click();
        cy.get("@modal").should("contain.text","Детали ингредиента");
        cy.get("[data-testid=close_modal_btn]").first().click();
        cy.get("@modal").should("not.contain.text","Детали ингредиента");
    });

    it("should dragging item to constructor", () => {
        cy.get('@ingredient-card').trigger("dragstart").trigger("dragleave");
        cy.get('[class^=burger-constructor_order]')
        .trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend");
        cy.get("[class^=burger-constructor_order]").should("contain.text","Краторная булка");
        cy.get('@ingredient-card').get('[class^=counter__num]').should("have.text","2");

        cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
        cy.get('[class^=burger-constructor_order]')
        .trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend");
        cy.get("[class^=burger-constructor_order]").should("contain.text","Соус Spicy-X");
    });

    it("should login, try create empty order and with ingredient", () => {
        
        cy.intercept("POST", API_BASE + 'orders', {
            fixture: "order"
        });
        cy.intercept("POST", API_BASE + 'auth/login', {
            fixture: "login"
        });

        
        cy.visit("/#/login");
        
        cy.get("[name=email]").type("email@email.ru");
        cy.get("[name=password]").type("password");
        cy.contains('Войти').click();

        cy.contains('Оформить заказ').click();
        cy.get("@modal").should("contain.text","Пустой заказ");    

        cy.get("[data-testid=close_modal_btn]").first().click();

        cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
        cy.get('[class^=burger-constructor_order]')
        .trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend");
        cy.contains('Оформить заказ').click();
        cy.get("@modal").should("contain.text","идентификатор заказа"); 
        cy.get("@modal").should("contain.text","38140"); 
        
        cy.get("[class^=modal-overlay]").click({force: true});

    });


});
