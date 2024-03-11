describe('Pruebas de funcionalidad', () => {
  beforeEach('ingreso a la pag web', () =>{
    cy.visit('https://www.demoblaze.com/#')
  })

  //prueba para verificar la respuesta de un API en login//
  it('prueba de login', () =>{
    // Al ingresas a la página, ingresa a la sección de login.//
    cy.xpath('//*[@id="login2"]').click()
    // Ingresar usuario y contraseña.//
    cy.xpath('//*[@id="loginusername"]').type('user1234')
    cy.xpath('//*[@id="loginpassword"]').type('password1234')
    // Hacer click en el botón de login.//
    cy.xpath('//*[@id="logInModal"]/div/div/div[3]/button[2]').click()
    // Esperar 2 segundos para que la página cargue.//
    cy.wait(2000)
    // Verificar que el usuario haya ingresado correctamente.//
    cy.request({
      method: 'POST',
      url: 'https://api.demoblaze.com/login',
      headers: {
        // Incluir cualquier encabezado necesario para la solicitud POST
        'Content-Type': 'application/json' // Tipo de contenido JSON
      },
      body: {
        // Incluir los datos necesarios para la solicitud POST
        username: 'user1234',
        password: 'password1234'
      }
    }).then((response) => {
      // Verificar que la solicitud POST fue exitosa o rechada por el servidor
      expect(response.status).to.eq(200);
    });
    })
    //prueba para verificar el formulario de contacto//
    it('prueba de formulario de contacto', () =>{
      // Al ingresar a la página, ingresa a la sección de contacto.//
      cy.xpath('//*[@id="navbarExample"]/ul/li[2]/a').click()
      // Ingresar el correo, nombre y mensaje.//
      cy.xpath('//*[@id="recipient-email"]').type('correo@correo.com')
      cy.xpath('//*[@id="recipient-name"]').type('primerNombre segundoNombre apellido apellidoDos')
      cy.xpath('//*[@id="message-text"]').type('este es un mensaje de prueba para el fomulario de contacto...')
      // Hacer click en el botón de enviar.//
      cy.xpath('//*[@id="exampleModal"]/div/div/div[3]/button[2]').click()  
    })

    //prueba para verificar que el logo de la web redireccione a la página principal//
    it('prueba de redirección del logo', ()=>{
      // Al ingresar a la página, hacer click en el logo.//
      cy.xpath('//*[@id="nava"]').click()
      // Verificar que la página redireccione a la página principal.//
      cy.url().should('eq', 'https://www.demoblaze.com/index.html')
      
    })
    //Prueba que verifica que el botón about us redireccione a la página about us y que funcione correctamente//
    it('prueba de redirección del botón about us', ()=>{
      // Al ingresar a la página, hacer click en el botón about us.//
      cy.xpath('//*[@id="navbarExample"]/ul/li[3]/a').click()
      // Verificar que la página crea una ventaja emergente con el vídeo correspondiente//
      cy.xpath('//*[@id="example-video"]/div[1]').should('be.visible')
      cy.xpath('//*[@id="videoModal"]/div/div/div[3]/button').should('be.visible')
    })
    //Verificar que el botón de carrito nos redirija a la parte esperada//
    it('prueba de cambio de pagina de carrito', ()=>{
      // Al ingresar a la página, hacer click en el botón de carrito.//
      cy.xpath('//*[@id="navbarExample"]/ul/li[4]/a').click()
      // Verificar que la página redireccione a la página de carrito.//
      cy.url().should('eq', 'https://www.demoblaze.com/cart.html')
      //varificar que el botón de place order este visible//
      cy.get('.col-lg-1 > .btn').should('be.visible')
    })
    //prueba para verificar que puedo visualizar los productos de la página//
    it('prueba de visualización de productos', ()=>{
      cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click()
      cy.url().should('eq', 'https://www.demoblaze.com/prod.html?idp_=1')
    })
    //prueba para verificar que se pueda agregar un producto al carrito//
    it('prueba de agregar productos al carrito', ()=>{
      cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click()
      cy.url().should('eq', 'https://www.demoblaze.com/prod.html?idp_=1')
      cy.get('.col-sm-12 > .btn').click()
      cy.wait(2000)
      cy.request({
        method: 'POST',
        url: 'http://www.demoblaze.com/addtocart',
        headers: {
          "Connection": "keep-alive",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "accept": "/",
          "cookie": "user=eb673d71-2288-f727-ff51-92910cfcfec8",
          "accept-encoding": "gzip, deflate",
          "referer": "http://www.demoblaze.com/addtocart"
        },
        followRedirect: false // Evita redireccionamientos automáticos
      }).then((response) => {
        // Verificar que la solicitud fue realizada correctamente
        expect(response.status).to.eq(302); // Se espera un redireccionamiento 302
        expect(response.redirectedToUrl).to.eq('https://www.demoblaze.com/addtocart'); // Verificar URL de redirección
      });
  
      // Verificar la respuesta
      cy.request({
        method: 'GET', // Puedes usar GET para verificar la respuesta
        url: 'https://www.demoblaze.com/addtocart' // URL de redirección
      }).then((response) => {
        // Verificar que la respuesta tenga el código de estado esperado
        expect(response.status).to.eq(404);
        // Verificar el contenido de la respuesta
        expect(response.body).to.include('<h1>Error: Not Found</h1>'); // Verificar si el mensaje de error está presente en el cuerpo de la respuesta
      });
    });
})

