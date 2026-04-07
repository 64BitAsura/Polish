/**
 * Polish Declination Data
 *
 * Contains all 7 Polish grammatical cases with:
 * - Descriptions and question words
 * - Ending rules for masculine, feminine, neuter nouns
 * - Example nouns with all declined forms
 * - Example sentences for context
 */

const CASES = [
  {
    id: "mianownik",
    name: "Mianownik",
    nameEn: "Nominative",
    number: 1,
    question: "kto? co?",
    questionEn: "who? what?",
    color: "#4CAF50",
    description:
      "The nominative case is the basic, dictionary form of a noun. It is used for the subject of a sentence — the person or thing performing the action.",
    usage: [
      "Subject of the sentence",
      "After 'to jest' (this is)",
      "Dictionary/base form",
    ],
    rules: {
      masculine: "No change — base form (e.g., kot, dom, student)",
      feminine: "No change — base form, typically ends in -a or -i (e.g., kobieta, noc)",
      neuter: "No change — base form, typically ends in -o or -e (e.g., okno, pole)",
    },
  },
  {
    id: "dopelniacz",
    name: "Dopełniacz",
    nameEn: "Genitive",
    number: 2,
    question: "kogo? czego?",
    questionEn: "of whom? of what?",
    color: "#2196F3",
    description:
      "The genitive case expresses possession, absence, or origin. It is one of the most commonly used cases in Polish and appears after many prepositions and negated verbs.",
    usage: [
      "Possession (e.g., dom ojca — father's house)",
      "After negation (nie mam kota — I don't have a cat)",
      "After prepositions: do, z, od, bez, dla, obok",
      "After quantities (dużo, mało, pięć...)",
    ],
    rules: {
      masculine:
        "Animate: -a (kot → kota); Inanimate: -u or -a (dom → domu, ser → sera)",
      feminine: "-a → -y or -i (kobieta → kobiety, noc → nocy)",
      neuter: "-o → -a, -e → -a (okno → okna, pole → pola)",
    },
  },
  {
    id: "celownik",
    name: "Celownik",
    nameEn: "Dative",
    number: 3,
    question: "komu? czemu?",
    questionEn: "to whom? to what?",
    color: "#FF9800",
    description:
      "The dative case indicates the indirect object — the receiver of an action. It answers the question 'to whom?' or 'for whom?'.",
    usage: [
      "Indirect object (Daję książkę mamie — I give a book to mom)",
      "After verbs: pomagać, dziękować, wierzyć",
      "After prepositions: ku, dzięki, przeciw",
      "Expressing feelings toward someone (Jest mi zimno — I am cold)",
    ],
    rules: {
      masculine: "-owi (kot → kotu, student → studentowi)",
      feminine: "-a → -e or -i (kobieta → kobiecie, noc → nocy)",
      neuter: "-o → -u, -e → -u (okno → oknu, pole → polu)",
    },
  },
  {
    id: "biernik",
    name: "Biernik",
    nameEn: "Accusative",
    number: 4,
    question: "kogo? co?",
    questionEn: "whom? what? (direct object)",
    color: "#E91E63",
    description:
      "The accusative case marks the direct object of a sentence — the thing being acted upon. It is used very frequently in everyday Polish.",
    usage: [
      "Direct object (Widzę kota — I see a cat)",
      "After prepositions: na, w, za, przez, o (with motion)",
      "After many common verbs: mieć, lubić, znać, widzieć",
    ],
    rules: {
      masculine:
        "Animate: same as genitive -a (kot → kota); Inanimate: no change (dom → dom)",
      feminine: "-a → -ę (kobieta → kobietę); consonant: no change (noc → noc)",
      neuter: "No change (okno → okno, pole → pole)",
    },
  },
  {
    id: "narzednik",
    name: "Narzędnik",
    nameEn: "Instrumental",
    number: 5,
    question: "kim? czym?",
    questionEn: "with whom? with what?",
    color: "#9C27B0",
    description:
      "The instrumental case indicates the tool or means by which something is done, or accompaniment. It is also used after the verb 'być' (to be) for professions and descriptions.",
    usage: [
      "Instrument/means (Piszę długopisem — I write with a pen)",
      "After 'być' for professions (Jestem studentem — I am a student)",
      "After prepositions: z, nad, pod, przed, między, za",
      "Accompaniment (Idę z kotem — I go with the cat)",
    ],
    rules: {
      masculine: "-em (kot → kotem, student → studentem)",
      feminine: "-a → -ą (kobieta → kobietą, noc → nocą)",
      neuter: "-o → -em, -e → -em (okno → oknem, pole → polem)",
    },
  },
  {
    id: "miejscownik",
    name: "Miejscownik",
    nameEn: "Locative",
    number: 6,
    question: "o kim? o czym?",
    questionEn: "about whom? about what?",
    color: "#00BCD4",
    description:
      "The locative case is always used with a preposition. It indicates location or the topic of discussion.",
    usage: [
      "Location (Jestem w domu — I am at home)",
      "Topic of discussion (Mówię o kocie — I talk about the cat)",
      "After prepositions: w, na, o, po, przy",
    ],
    rules: {
      masculine: "-e or -u (kot → kocie, dom → domu)",
      feminine: "-a → -e or -i (kobieta → kobiecie, noc → nocy)",
      neuter: "-o → -e, -e → -u (okno → oknie, pole → polu)",
    },
  },
  {
    id: "wolacz",
    name: "Wołacz",
    nameEn: "Vocative",
    number: 7,
    question: "o!",
    questionEn: "(direct address)",
    color: "#795548",
    description:
      "The vocative case is used for directly addressing someone. It is common in spoken Polish and in letters.",
    usage: [
      "Calling someone (Aniu! Marku!)",
      "Letters and emails (Drogi Panie Profesorze!)",
      "Exclamations (Boże! — Oh God!)",
    ],
    rules: {
      masculine: "-e or -u (kot → kocie, student → studencie, pan → panie)",
      feminine: "-a → -o (kobieta → kobieto); -i: no change (pani → pani)",
      neuter: "Same as nominative (rarely used)",
    },
  },
];

/**
 * Example nouns with all 7 case forms.
 * Each noun includes: word, gender, english translation, and all 7 forms.
 * Forms array order: [Nominative, Genitive, Dative, Accusative, Instrumental, Locative, Vocative]
 */
const NOUNS = [
  {
    word: "kot",
    gender: "masculine",
    genderLabel: "masculine animate",
    english: "cat",
    forms: ["kot", "kota", "kotu", "kota", "kotem", "kocie", "kocie"],
    sentences: [
      "Kot śpi na sofie. (The cat sleeps on the sofa.)",
      "Nie mam kota. (I don't have a cat.)",
      "Daję jedzenie kotu. (I give food to the cat.)",
      "Widzę kota. (I see the cat.)",
      "Idę z kotem. (I walk with the cat.)",
      "Mówię o kocie. (I talk about the cat.)",
      "Kocie, chodź tu! (Cat, come here!)",
    ],
  },
  {
    word: "dom",
    gender: "masculine",
    genderLabel: "masculine inanimate",
    english: "house",
    forms: ["dom", "domu", "domowi", "dom", "domem", "domu", "domie"],
    sentences: [
      "Dom jest duży. (The house is big.)",
      "Nie mam domu. (I don't have a house.)",
      "Przyglądam się domowi. (I look at the house.)",
      "Widzę dom. (I see the house.)",
      "Zajmuję się domem. (I take care of the house.)",
      "Mieszkam w domu. (I live in the house.)",
      "Domie mój! (My house!)",
    ],
  },
  {
    word: "student",
    gender: "masculine",
    genderLabel: "masculine animate",
    english: "student (male)",
    forms: [
      "student",
      "studenta",
      "studentowi",
      "studenta",
      "studentem",
      "studencie",
      "studencie",
    ],
    sentences: [
      "Student czyta książkę. (The student reads a book.)",
      "Nie znam studenta. (I don't know the student.)",
      "Pomagam studentowi. (I help the student.)",
      "Widzę studenta. (I see the student.)",
      "Rozmawiam ze studentem. (I talk with the student.)",
      "Mówię o studencie. (I talk about the student.)",
      "Studencie, ucz się! (Student, study!)",
    ],
  },
  {
    word: "kobieta",
    gender: "feminine",
    genderLabel: "feminine",
    english: "woman",
    forms: [
      "kobieta",
      "kobiety",
      "kobiecie",
      "kobietę",
      "kobietą",
      "kobiecie",
      "kobieto",
    ],
    sentences: [
      "Kobieta idzie do sklepu. (The woman goes to the store.)",
      "Nie znam kobiety. (I don't know the woman.)",
      "Daję kwiaty kobiecie. (I give flowers to the woman.)",
      "Widzę kobietę. (I see the woman.)",
      "Rozmawiam z kobietą. (I talk with the woman.)",
      "Myślę o kobiecie. (I think about the woman.)",
      "Kobieto, posłuchaj! (Woman, listen!)",
    ],
  },
  {
    word: "książka",
    gender: "feminine",
    genderLabel: "feminine",
    english: "book",
    forms: [
      "książka",
      "książki",
      "książce",
      "książkę",
      "książką",
      "książce",
      "książko",
    ],
    sentences: [
      "Książka leży na stole. (The book lies on the table.)",
      "Nie mam książki. (I don't have the book.)",
      "Przyglądam się książce. (I look at the book.)",
      "Czytam książkę. (I read the book.)",
      "Zajmuję się książką. (I deal with the book.)",
      "Mówię o książce. (I talk about the book.)",
      "Książko moja! (My book!)",
    ],
  },
  {
    word: "noc",
    gender: "feminine",
    genderLabel: "feminine",
    english: "night",
    forms: ["noc", "nocy", "nocy", "noc", "nocą", "nocy", "nocy"],
    sentences: [
      "Noc jest ciemna. (The night is dark.)",
      "Nie lubię nocy. (I don't like the night.)",
      "Przyglądam się nocy. (I look at the night.)",
      "Lubię noc. (I like the night.)",
      "Zajmuję się nocą. (I deal with the night.)",
      "Mówię o nocy. (I talk about the night.)",
      "O, nocy! (Oh, night!)",
    ],
  },
  {
    word: "okno",
    gender: "neuter",
    genderLabel: "neuter",
    english: "window",
    forms: ["okno", "okna", "oknu", "okno", "oknem", "oknie", "okno"],
    sentences: [
      "Okno jest otwarte. (The window is open.)",
      "Nie mam okna. (I don't have a window.)",
      "Przyglądam się oknu. (I look at the window.)",
      "Otwieram okno. (I open the window.)",
      "Stoi przed oknem. (He stands before the window.)",
      "Mówię o oknie. (I talk about the window.)",
      "Okno! (Window!)",
    ],
  },
  {
    word: "pole",
    gender: "neuter",
    genderLabel: "neuter",
    english: "field",
    forms: ["pole", "pola", "polu", "pole", "polem", "polu", "pole"],
    sentences: [
      "Pole jest zielone. (The field is green.)",
      "Nie mam pola. (I don't have a field.)",
      "Przyglądam się polu. (I look at the field.)",
      "Widzę pole. (I see the field.)",
      "Zajmuję się polem. (I deal with the field.)",
      "Mówię o polu. (I talk about the field.)",
      "Pole! (Field!)",
    ],
  },
  {
    word: "dziecko",
    gender: "neuter",
    genderLabel: "neuter",
    english: "child",
    forms: [
      "dziecko",
      "dziecka",
      "dziecku",
      "dziecko",
      "dzieckiem",
      "dziecku",
      "dziecko",
    ],
    sentences: [
      "Dziecko bawi się. (The child is playing.)",
      "Nie mam dziecka. (I don't have a child.)",
      "Pomagam dziecku. (I help the child.)",
      "Widzę dziecko. (I see the child.)",
      "Idę z dzieckiem. (I walk with the child.)",
      "Mówię o dziecku. (I talk about the child.)",
      "Dziecko, chodź tu! (Child, come here!)",
    ],
  },
  {
    word: "pies",
    gender: "masculine",
    genderLabel: "masculine animate",
    english: "dog",
    forms: ["pies", "psa", "psu", "psa", "psem", "psie", "psie"],
    sentences: [
      "Pies szczeka. (The dog barks.)",
      "Nie mam psa. (I don't have a dog.)",
      "Daję kość psu. (I give a bone to the dog.)",
      "Widzę psa. (I see the dog.)",
      "Idę z psem. (I walk with the dog.)",
      "Mówię o psie. (I talk about the dog.)",
      "Psie, siedź! (Dog, sit!)",
    ],
  },
  {
    word: "mama",
    gender: "feminine",
    genderLabel: "feminine",
    english: "mom",
    forms: ["mama", "mamy", "mamie", "mamę", "mamą", "mamie", "mamo"],
    sentences: [
      "Mama gotuje obiad. (Mom cooks dinner.)",
      "Nie ma mamy. (Mom is not here.)",
      "Daję prezent mamie. (I give a gift to mom.)",
      "Kocham mamę. (I love mom.)",
      "Rozmawiam z mamą. (I talk with mom.)",
      "Myślę o mamie. (I think about mom.)",
      "Mamo! (Mom!)",
    ],
  },
  {
    word: "miasto",
    gender: "neuter",
    genderLabel: "neuter",
    english: "city",
    forms: [
      "miasto",
      "miasta",
      "miastu",
      "miasto",
      "miastem",
      "mieście",
      "miasto",
    ],
    sentences: [
      "Miasto jest piękne. (The city is beautiful.)",
      "Nie znam miasta. (I don't know the city.)",
      "Przyglądam się miastu. (I look at the city.)",
      "Zwiedzam miasto. (I visit the city.)",
      "Zajmuję się miastem. (I deal with the city.)",
      "Mieszkam w mieście. (I live in the city.)",
      "Miasto! (City!)",
    ],
  },
];

/**
 * Case names array (indexed 0-6 matching form arrays)
 */
const CASE_NAMES = [
  "Mianownik",
  "Dopełniacz",
  "Celownik",
  "Biernik",
  "Narzędnik",
  "Miejscownik",
  "Wołacz",
];

const CASE_NAMES_EN = [
  "Nominative",
  "Genitive",
  "Dative",
  "Accusative",
  "Instrumental",
  "Locative",
  "Vocative",
];
