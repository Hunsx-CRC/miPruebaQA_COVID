describe('Pruebas de funcionalidad', () => {
    beforeEach('ingreso a la pag web', () => {
      cy.visit('https://www.demoblaze.com/#');
    });
  
    it('prueba de login', () => {
      // Esta prueba verifica el proceso de login de la página web.
      cy.xpath('//*[@id="login2"]')
        .click();
  
      // Ingresar usuario y contraseña
      cy.xpath('//*[@id="loginusername"]')
        .type('user1234');
  
      cy.xpath('//*[@id="loginpassword"]')
        .type('password1234');
  
      // Hacer click en el botón de login
      cy.xpath('//*[@id="logInModal"]/div/div/div[3]/button[2]')
        .click();
  
      // Esperar 2 segundos para que la página cargue
      cy.wait(2000);
  
      // Verificar que el usuario haya ingresado correctamente
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'user1234',
          password: 'password1234'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
    it('prueba de formulario de contacto', () => {
      // Esta prueba verifica el proceso de envío de un formulario de contacto.
      cy.xpath('//*[@id="navbarExample"]/ul/li[2]/a')
        .click();
  
      // Ingresar datos en el formulario de contacto
      cy.xpath('//*[@id="recipient-email"]')
        .type('correo@correo.com');
  
      cy.xpath('//*[@id="recipient-name"]')
        .type('primerNombre segundoNombre apellido apellidoDos');
  
      cy.xpath('//*[@id="message-text"]')
        .type('este es un mensaje de prueba para el formulario de contacto...');
  
      // Hacer click en el botón de enviar
      cy.xpath('//*[@id="exampleModal"]/div/div/div[3]/button[2]')
        .click();
    });
  
    it('prueba de redirección del logo', () => {
      // Esta prueba verifica que el logo de la página redireccione a la página principal.
      cy.get('#nava')
        .click();
  
      // Verificar que la página redirija a la página principal
      cy.url().should('eq', 'https://www.demoblaze.com/index.html');
    });
  
     
     it('prueba de redirección del botón about us', ()=>{
        // Esta prueba verifica que el botón about us redireccione a la página about us y que funcione correctamente
        cy.xpath('//*[@id="navbarExample"]/ul/li[3]/a').click()
        // Verificar que la página crea una ventaja emergente con el vídeo correspondiente//
        cy.xpath('//*[@id="example-video"]/div[1]').should('be.visible')
        cy.xpath('//*[@id="videoModal"]/div/div/div[3]/button').should('be.visible')
        cy.xpath('//*[@id="example-video"]/button').should('be.visible').click();
        cy.get('#example-video_html5_api', { timeout: 10000 }).should('be.visible').then(($video) => {
            expect($video[0].paused).to.be.false; 
        });

      })
  
    it('prueba de cambio de pagina de carrito', () => {
      //Esta prueba verifica que el botón de carrito nos redirija a la parte esperada
      cy.xpath('//*[@id="navbarExample"]/ul/li[4]/a')
        .click();
  
      // Verificar que la página redirija a la página de carrito
      cy.url().should('eq', 'https://www.demoblaze.com/cart.html');
      // Verificar que el botón de place order esté visible
      cy.get('.col-lg-1 > .btn').should('be.visible');
    });
  
    it('prueba de visualización de productos', () => {
      // Esta prueba verifica que se pueda visualizar los productos de la página
      cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click();
      // Verificar que la URL sea la correcta
      cy.url().should('eq', 'https://www.demoblaze.com/prod.html?idp_=1');
    });
  
    it('prueba de agregar productos al carrito', () => {
      // Esta prueba verifica que se pueda agregar un producto al carrito
      cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click();
      // Verificar que la URL sea la correcta
      cy.url().should('eq', 'https://www.demoblaze.com/prod.html?idp_=1');
      // Hacer click en el botón de agregar al carrito
      cy.get('.col-sm-12 > .btn').click();
      // Esperar 2 segundos
      cy.wait(2000);
      // Realizar la solicitud POST para agregar al carrito
      cy.request({
        method: 'POST',
        url: 'https://www.demoblaze.com/prod.html?idp_=1#',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          id: 1
        }
        }).then((response) => {
            // Verificar que la solicitud POST fue exitosa
            expect(response.status).to.eq(200);
            });
    })
})