const { Model } = require("sequelize")

const frases = [
    {"autor":"Walt Disney","texto":"La manera de empezar es dejar de hablar y comenzar a hacer."},
    {"autor":"Steve Jobs","texto":"La innovación es lo que distingue a un líder de un seguidor."},
    {"autor":"Confucio","texto":"Elige un trabajo que te guste y no tendrás que trabajar ni un día de tu vida."},
    {"autor":"Henry Ford","texto":"El fracaso es simplemente la oportunidad de comenzar de nuevo, esta vez de forma más inteligente."},
    {"autor":"Thomas Edison","texto":"Nuestro mayor debilidad está en rendirnos. La forma más segura de tener éxito es intentarlo una vez más."},
    {"autor":"Theodore Roosevelt","texto":"Haz lo que puedas, con lo que tengas, donde estés."},
    {"autor":"Vince Lombardi","texto":"Los ganadores nunca se rinden y los que se rinden nunca ganan."},
    {"autor":"Zig Ziglar","texto":"Puedes tener todo lo que quieras en la vida si ayudas a suficiente gente a conseguir lo que quieren."},
    {"autor":"Albert Einstein","texto":"La vida es como andar en bicicleta. Para mantener el equilibrio debes seguir adelante."},
    {"autor":"Nelson Mandela","texto":"Siempre parece imposible hasta que se hace."},
    {"autor":"Jim Rohn","texto":"La disciplina es el puente entre las metas y los logros."},
    {"autor":"Eleanor Roosevelt","texto":"El futuro pertenece a quienes creen en la belleza de sus sueños."},
    {"autor":"Wayne Gretzky","texto":"Puedes fallar en algo que no te gusta, así que mejor arriesga en algo que te apasiona."},
    {"autor":"Mark Twain","texto":"El secreto para salir adelante es empezar."},
    {"autor":"Babe Ruth","texto":"Nunca permitas que el miedo a perder sea mayor que la emoción de ganar."},
    {"autor":"Oprah Winfrey","texto":"La mayor aventura que puedes tomar es vivir la vida de tus sueños."},
    {"autor":"Tony Robbins","texto":"La única cosa que se interpone entre tú y tu meta es la historia que te sigues contando a ti mismo."},
    {"autor":"Michael Jordan","texto":"He fallado una y otra vez en mi vida, por eso he tenido éxito."},
    {"autor":"Dalai Lama","texto":"Elige ser optimista, se siente mejor."},
    {"autor":"Helen Keller","texto":"La vida es una aventura atrevida o no es nada."},
    {"autor":"Aristóteles","texto":"Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto sino un hábito."},
    {"autor":"Ralph Waldo Emerson","texto":"Lo que está delante de nosotros y lo que está detrás de nosotros son asuntos minúsculos comparados con lo que está dentro de nosotros."},
    {"autor":"Winston Churchill","texto":"El éxito no es definitivo, el fracaso no es fatal: es el coraje para continuar lo que cuenta."},
    {"autor":"Helen Keller","texto":"Aunque el mundo está lleno de sufrimiento, también está lleno de superación del mismo."},
    {"autor":"Abraham Lincoln","texto":"La mejor forma de predecir el futuro es crearlo."},
    {"autor":"Norman Vincent Peale","texto":"Cambia tus pensamientos y cambiarás tu mundo."},
    {"autor":"John Maxwell","texto":"El liderazgo es influencia, nada más y nada menos."},
    {"autor":"Confucio","texto":"No importa lo lento que avances mientras no te detengas."},
    {"autor":"Lou Holtz","texto":"No te preocupes por fracasar, preocúpate por las oportunidades que pierdes cuando ni siquiera lo intentas."},
    {"autor":"Albert Schweitzer","texto":"El éxito es la suma de pequeños esfuerzos repetidos día tras día."},
    {"autor":"Stephen Covey","texto":"La proactividad es la habilidad de controlar nuestro destino."},
    {"autor":"Jack Ma","texto":"Nunca te rindas. Hoy es difícil, mañana será peor, pero pasado mañana habrá sol."},
    {"autor":"Marie Curie","texto":"Nada en la vida debe ser temido, solamente comprendido."},
    {"autor":"George Bernard Shaw","texto":"El progreso es imposible sin cambio, y quienes no pueden cambiar sus mentes no pueden cambiar nada."},
    {"autor":"Helen Keller","texto":"Lo mejor y más hermoso del mundo no puede ser visto ni siquiera tocado. Debe ser sentido con el corazón."},
    {"autor":"Napoleon Hill","texto":"Lo que la mente del hombre puede concebir y creer, puede lograr."},
    {"autor":"Bob Marley","texto":"No vivas para que tu presencia se note, sino para que tu ausencia se sienta."},
    {"autor":"Seneca","texto":"La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad."},
    {"autor":"Wayne Dyer","texto":"Cambia la forma en que miras las cosas y las cosas que miras cambiarán."},
    {"autor":"Louisa May Alcott","texto":"Nunca te arrepientas de ser una persona amable."},
    {"autor":"Ralph Waldo Emerson","texto":"Haz lo que puedas, con lo que tengas, donde estés."},
    {"autor":"Oprah Winfrey","texto":"Tienes que saber lo que quieres y no aceptar un no por respuesta."},
    {"autor":"Barack Obama","texto":"El cambio no vendrá si esperamos a otra persona o a otro tiempo."},
    {"autor":"Dale Carnegie","texto":"Recuerda que una persona feliz no es alguien en una situación determinada, sino alguien con una actitud determinada."},
    {"autor":"Elon Musk","texto":"Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades no están a tu favor."},
    {"autor":"Anne Frank","texto":"Lo que está detrás de nosotros y lo que está delante de nosotros son asuntos minúsculos comparados con lo que está dentro de nosotros."},
    {"autor":"Buddha","texto":"La mente es todo. Te conviertes en lo que piensas."},
    {"autor":"Mahatma Gandhi","texto":"Sé el cambio que quieres ver en el mundo."},
    {"autor":"John Wooden","texto":"La confianza proviene de la preparación."},
    {"autor":"Elbert Hubbard","texto":"La mayor tragedia no es el fracaso sino la pérdida de entusiasmo."},
    {"autor":"Martin Luther King Jr.","texto":"La fe es dar el primer paso, incluso cuando no ves toda la escalera."},
    {"autor":"Helen Keller","texto":"La única cosa peor que ser ciego es tener vista pero no tener visión."},
    {"autor":"J.K. Rowling","texto":"Es imposible vivir sin fracasar en algo, a menos que vivas tan cuidadosamente que no hayas vivido en absoluto."},
    {"autor":"Frederick Douglass","texto":"Sin un cambio de mentalidad, no puede haber un cambio real."},
    {"autor":"Benjamin Franklin","texto":"Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo."},
    {"autor":"Eleanor Roosevelt","texto":"Haz una cosa cada día que te asuste."},
    {"autor":"Steve Jobs","texto":"Tu trabajo va a llenar gran parte de tu vida, y la única forma de estar verdaderamente satisfecho es hacer lo que crees que es un gran trabajo."},
    {"autor":"Vince Lombardi","texto":"La perfección no es alcanzable, pero si perseguimos la perfección podemos alcanzar la excelencia."},
    {"autor":"Malala Yousafzai","texto":"Un niño, un maestro, un libro y un lápiz pueden cambiar el mundo."},
    {"autor":"Michelle Obama","texto":"El éxito no se mide por lo que logras, sino por la oposición que has superado."},
    {"autor":"Helen Keller","texto":"Cada vez que enfrentas una dificultad, intenta encontrar el lado positivo."},
    {"autor":"Walt Disney","texto":"Todos nuestros sueños pueden hacerse realidad si tenemos el coraje de perseguirlos."},
    {"autor":"Barack Obama","texto":"El cambio no llegará si esperamos a otra persona o a otro tiempo."},
    {"autor":"Dwayne Johnson","texto":"El éxito no es siempre la gran cosa, sino las pequeñas cosas que haces consistentemente."},
    {"autor":"Bill Gates","texto":"Está bien celebrar el éxito, pero es más importante prestar atención a las lecciones del fracaso."},
    {"autor":"Elon Musk","texto":"La persistencia es muy importante. No debes rendirte a menos que estés obligado a rendirte."},
    {"autor":"Tony Robbins","texto":"La vida no es acerca de esperar a que pase la tormenta, es aprender a bailar bajo la lluvia."},
    {"autor":"Jim Rohn","texto":"No te conviertes en lo que quieres, te conviertes en lo que crees."},
    {"autor":"Robin Sharma","texto":"El secreto del éxito es la constancia en el propósito."},
    {"autor":"Zig Ziglar","texto":"La gente exitosa hace lo que la gente no exitosa no está dispuesta a hacer."},
    {"autor":"Stephen Covey","texto":"Busca primero entender, luego ser entendido."},
    {"autor":"Norman Vincent Peale","texto":"Cree en ti mismo! Ten fe en tus habilidades!"}
  ]
  
  module.exports = frases;
