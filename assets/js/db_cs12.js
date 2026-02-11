const DB_CS12 = {
    // ID урока: u3b-1 (Unit 3B, Урок 1)
    "u3b-1": {
        title: "Number systems. Represent positive decimal numbers in binary.",
        los: ["12.1.1.1 convert a number from one number system to another","12.1.1.2 explain the advantages of using hexadecimal numbers in computer systems"],
        
        // Файлы по вашему стандарту:
        image: "assets/img/12cs_u3b_img_1.png", 
        theoryUrl: "assets/lessons/12cs/12cs_u3b_1.html",
        slides: "assets/pdf/12cs/12cs_u3b_slides_1.pdf",
        
        video: "", // ID видео с YouTube (если есть)
        
        quiz: [
            { q: "What is the maximum value of 8 bits?", a: "255 (calculated as 2^8 - 1)." },
            { q: "Which digit represents the 'active' state?", a: "1" }
        ]
    },

    // УРОК 2: ТОЛЬКО ТЕКСТ (Картинки, видео и слайдов нет)
    "u3b-2": {
        title: "Binary Addition and Multiplication",
        los: ["12.1.1.3 Perform arithmetic operations: addition and multiplication of binary numbers"],
        
        // Поля пустые, блоки скроются сами:
        image: "", 
        video: "", 
        slides: "",

        // Ссылка на созданный нами файл
        theoryUrl: "assets/lessons/12cs/12cs_u3b_2.html",
        
        // Тест внизу страницы
        quiz: [
            { q: "What is 1 + 1 in binary?", a: "10 (0 carry 1)" },
            { q: "Which component of the CPU performs addition?", a: "ALU (Arithmetic Logic Unit)" },
            { q: "What is the result of 101 × 10?", a: "1010 (Shift left)" }
        ]
    },
    "u3b-3": {
        title: "Two's Complement Representation",
        los: ["12.1.1.4 Represent positive and negative numbers in Two's Complement"],
        
        // Поля пустые (блоки скроются)
        image: "", 
        video: "", 
        slides: "",

        // Ссылка на HTML файл (создай его!)
        theoryUrl: "assets/lessons/12cs/12cs_u3b_3.html",
        
        // Cambridge-style Self Check
        quiz: [
            { 
                q: "What is the decimal value of the Two's Complement number <b>11111111</b>?", 
                a: "<b>-1</b> (Flip bits: 00000000 → Add 1: 00000001 → Apply sign: -1)" 
            },
            { 
                q: "Convert <b>-18</b> to 8-bit binary.", 
                a: "<b>11101110</b> (18 is 00010010 → Flip: 11101101 → Add 1: 11101110)" 
            },
            { 
                q: "What is the minimum value storeable in an 8-bit signed register?", 
                a: "<b>-128</b> (Equation: -2^(8-1))" 
            },
            { 
                q: "Why is Two's Complement preferred over Sign & Magnitude?", 
                a: "It eliminates the 'double zero' problem and simplifies arithmetic logic." 
            }
        ]
    },
    "u3b-4": {
        title: "Fixed Point & Floating Point",
        los: [
            "12.1.1.6 Fixed Point representation",
            "12.1.1.7 Floating Point (Normalization, Precision vs Range)"
        ],
        
        // Поля пустые (автоматически скроются)
        image: "", 
        video: "", 
        slides: "",

        // Ссылка на обновленный файл
        theoryUrl: "assets/lessons/12cs/12cs_u3b_4.html",
        
        // Cambridge A-Level style Quiz
        quiz: [
            { 
                q: "Why do we normalize floating point numbers?", 
                a: "To ensure a <b>unique representation</b> and maximize <b>precision</b> (save bits)." 
            },
            { 
                q: "A signed binary number starts with <b>1.110...</b>. Is it normalized?", 
                a: "<b>NO.</b> A normalized negative number must start with <b>1.0</b>." 
            },
            { 
                q: "What happens if you increase the Exponent size but decrease the Mantissa?", 
                a: "<b>Range increases</b>, but Precision decreases." 
            },
            { 
                q: "Convert <b>-1.5</b> to a normalized floating point (Mantissa: 6 bits, Exp: 4 bits).", 
                a: "<b>101000 0001</b>.<br>(1.5 is 01.1 -> -1.5 is 10.1 -> Norm: 1.01 (Exp +1))." 
            }
        ]
    }
};
