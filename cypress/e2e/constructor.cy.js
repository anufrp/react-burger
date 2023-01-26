import { API_BASE } from "../../src/services/constants";

describe("Application", () => {
    beforeEach(() => {
        cy.intercept("GET", API_BASE + 'ingredients', {
            fixture: "ingredients"
        });
        cy.visit("/");
    })

    it("should show modal with ingredient info after click on it", () => {
        cy.get("[data-testid=ingredient_card]").first().click();
        cy.get("[id=modalRoot]").should("contain.text","Детали ингредиента");
        cy.get("[id=modalRoot]").should("contain.text","Краторная булка");
    });

    it("should show close modal on click close button", () => {
        cy.get("[data-testid=ingredient_card]").first().click();
        cy.get("[id=modalRoot]").should("contain.text","Детали ингредиента");
        cy.get("[data-testid=close_modal_btn]").first().click();
        cy.get("[id=modalRoot]").should("not.contain.text","Детали ингредиента");
    });

    it("should dragging item to constructor", () => {
        cy.get("[data-testid=ingredient_card]").first().as('item');
        cy.get('@item').trigger("dragstart").trigger("dragleave");
        cy.get('[class^=burger-constructor_order]')
        .trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend");
        cy.get("[class^=burger-constructor_order]").should("contain.text","Краторная булка");
        cy.get('@item').get('[class^=counter__num]').should("have.text","2");

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
        cy.get("[id=modalRoot]").should("contain.text","Пустой заказ");    

        cy.get("[data-testid=close_modal_btn]").first().click();

        cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
        cy.get('[class^=burger-constructor_order]')
        .trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend");
        cy.contains('Оформить заказ').click();
        cy.get("[id=modalRoot]").should("contain.text","идентификатор заказа"); 
        cy.get("[id=modalRoot]").should("contain.text","38140"); 
        
        cy.get("[class^=modal-overlay]").click({force: true});

    });


});
