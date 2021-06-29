const general_error = 'Lo sentimos tenemos un problema, intentelo más tarde'

const header = {
  item: {
    courses: 'Cursos',
    class_live: 'Clases en vivo',
    leadership: 'Liderazgo',
    tutorials: 'Tutoriales',
    tools: 'Herramientas',
    questions_frequent: 'Preguntas frecuentes',
    log_out: 'Cerrar sesión',
    memories: 'Memorias',
    events: 'Eventos FEX',
    live: "En vivo"
  },
  profile: {
    hi: 'Hola'
  }
}

const scenes = {
  courses: {
    welcome: 'Bienvenid@',
    welcome_first_paragraph_first: 'Accede a los contenidos académicos y de información que',
    welcome_first_paragraph_second: 'ha creado para ti.',
    welcome_second_paragraph: 'Queremos que con estos, inicies o impulses tu emprendimiento en negocios digitales.',
    modules: 'Módulos',
    hours: 'Horas y',
    minute: 'Minutos',
    min: 'min',
    start_course: "Empezar curso",
    continue_course: 'Continuar curso',
    course_progress: "Progreso del curso",
    course_detail: "Detalles del curso",
  },
  modules: {
    modules: 'Módulos',
    module: 'Módulo',
    lessons: 'Lecciones',
    theme_summary: 'Resumen del tema',
    quiz: 'Quiz',
    files: 'Archivos',
    correct: '¡Correcta!',
    wrong: '¡Incorrecta!',
    confirm: 'Confirmar',
  },
  profileCourse: {
    course_details: 'Detalles del curso',
    characteristics: 'Características',
    modules: 'Módulos',
    hours: 'Horas',
    available: "Disponible en {{unlockDays}} día{{plural}}",
  },
  profileUser: {
    data: 'Datos personales',
    age: 'Edad',
    civilStatus: 'Estado civil',
    gender: 'Género',
    studies: 'Nivel de estudios',
    country: 'País',
    profession: 'Profesión',
    city: 'Ciudad',
    employmentSituation: 'Situación laboral'
  },
  quiz: {
    next: "Siguiente",
    close: "Cerrar",
    back: "Atrás",
    update: 'Actualizar',
    next_lesson: 'Siguiente Lección',
    next_module: 'Siguiente Módulo',
    next_course: 'Más Cursos',
    quiz_module: 'Quiz final',
    view_lesson: 'Ver lección',
    try_again: 'Intentar de nuevo',
    quiz_correct: 'Haz finalizado esta lección',
    quiz_wrong: 'Intentalo de nuevo',
    quiz_final_correct: 'Haz finalizado este módulo',
    quiz_final_wrong: 'Intentalo de nuevo'
  },
  frequent_questions: {
    theme: 'Tema'
  },
  memories: {
    header: 'Memorias',
    sub_header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu lectus, cursus et fringilla rutrum massa. Etiam ante odio, ullamcorper nec rutrum a, gravida vitae elit.',
    memory: 'Memoria',
    live: "En vivo"
  },
  tutorials: {
    header: 'Tutoriales',
    goTo: 'Ir a tutorial',
  },
  tools: {
    header: 'Herramientas',
    goTo: 'Ir a herramienta',
  },
  events: {
    click_here: 'Clic Aquí',
  }
}

const error = {
  general_error,
  login: {
    ERROR_LOGIN: general_error,
    USER_NOT_EXIST: 'El usuario no existe',
    NO_USERNAME: 'Por favor introduce tu usuario',
    NO_PASSWORD: 'Por favor digita una contraseña',
    USER_INACTIVED: 'El usuario se encuentra inactivo.'
  }
}

const button = {
  login: 'Iniciar sesión',
  user: 'Usuario',
  password: 'Contraseña',
  start: 'Iniciar',
  continue: 'Continuar',
  begin: 'Empezar',
  logout: 'Cerrar sesión',
  account: 'Mi cuenta',
  go_to: 'Ir a',
  reset_course: 'Reiniciar curso'
}

export const es = {
  header,
  button,
  scenes,
  error
}