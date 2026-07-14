// ============================================================
//  RISE — Syllabus Data
//  Keyed by: course_semester  e.g. "IMCA_1", "IMCA_2"
//  script.js picks the right bucket using studentProfile
// ============================================================

export const allSyllabi = {

    // ════════════════════════════════════════
    //  IMCA — Semester 1
    // ════════════════════════════════════════
    "IMCA_1": {
        semester: "IMCA Semester 1",
        subjects: [

            // ── C Programming ──────────────────────
            {
                id: "c",
                name: "Programming Fundamentals Using C",
                icon: "💻",
                units: [
                    {
                        name: "Unit 1 : Introduction & Basics",
                        topics: [
                            "Introduction",
                            "Concept of Problem Solving",
                            "Problem Definition",
                            "Program Design",
                            "Techniques of Problem Solving",
                            "Flowchart",
                            "Algorithm",
                            "Pseudo Code",
                            "Structured Programming Concepts",
                            "C Character Set",
                            "Tokens",
                            "Identifiers",
                            "Keywords",
                            "Constants",
                            "Variables",
                            "Data Types",
                            "Structure of a C Program"
                        ]
                    },
                    {
                        name: "Unit 2 : Operators & I/O",
                        topics: [
                            "Types of Statements",
                            "Declarations",
                            "Arithmetic Statements",
                            "Arithmetic Operations",
                            "Arithmetic Operators",
                            "Relational Operators",
                            "Equality Operators",
                            "Logical Operators",
                            "Assignment Operators",
                            "Compound Assignment Operators",
                            "Classification of Operators",
                            "Unary Operators",
                            "Binary Operators",
                            "Ternary (Conditional) Operator",
                            "Operator Precedence",
                            "Associativity",
                            "Library Functions",
                            "Single Character Input",
                            "Single Character Output",
                            "Entering Data",
                            "Writing Data"
                        ]
                    },
                    {
                        name: "Unit 3 : Control Statements",
                        topics: [
                            "Control Statements",
                            "Statements and Blocks",
                            "Decision Making Structures",
                            "if Statement",
                            "if-else Statement",
                            "Nested if",
                            "while Loop",
                            "for Loop",
                            "do-while Loop",
                            "Case Control Structures",
                            "switch Statement",
                            "break Statement",
                            "continue Statement",
                            "Nested Control Structures"
                        ]
                    },
                    {
                        name: "Unit 4 : Arrays, Functions & Pointers",
                        topics: [
                            "Arrays",
                            "Array Definition",
                            "Array Types",
                            "Array Initialization",
                            "Processing an Array",
                            "Two Dimensional Arrays",
                            "Sorting",
                            "Searching",
                            "Copying Arrays",
                            "Insertion in Array",
                            "Deletion of Elements in Array",
                            "Functions",
                            "Function Declaration",
                            "Function Definition",
                            "Function Prototype",
                            "Passing Parameters",
                            "Recursion",
                            "Pointers",
                            "Pointers and Arrays",
                            "Pointers and Functions"
                        ]
                    },
                    {
                        name: "Unit 5 : User Defined Data Types",
                        topics: [
                            "User Defined Data Types",
                            "Additional Features of C",
                            "Structures",
                            "Array of Structures",
                            "Array within Structures",
                            "Structures within Structures",
                            "Union",
                            "Enumerations",
                            "Preprocessor Directives"
                        ]
                    }
                ]
            },

            // ── Discrete Mathematics ───────────────
            {
                id: "dm",
                name: "Discrete Mathematics",
                icon: "📐",
                units: [
                    {
                        name: "Unit 1 : Sets",
                        topics: [
                            "Sets",
                            "Subsets",
                            "Equal Sets",
                            "Universal Sets",
                            "Finite Sets",
                            "Infinite Sets",
                            "Operations on Sets",
                            "Union of Sets",
                            "Intersection of Sets",
                            "Complement of Sets",
                            "Cartesian Product",
                            "Cardinality of Set",
                            "Simple Applications"
                        ]
                    },
                    {
                        name: "Unit 2 : Relations",
                        topics: [
                            "Relations",
                            "Properties of Relations",
                            "Equivalence Relation",
                            "Partial Order Relation"
                        ]
                    },
                    {
                        name: "Unit 3 : Functions",
                        topics: [
                            "Functions",
                            "Domain",
                            "Range",
                            "Onto Function",
                            "Into Function",
                            "One to One Function",
                            "Composite Function",
                            "Inverse Function",
                            "Hashing Functions",
                            "Recursive Function"
                        ]
                    },
                    {
                        name: "Unit 4 : POSET & Lattices",
                        topics: [
                            "Partial Order Sets (POSET)",
                            "Representation of POSET using Hasse Diagram",
                            "Chains",
                            "Maximal Point",
                            "Minimal Point",
                            "Greatest Lower Bound (GLB)",
                            "Least Upper Bound (LUB)"
                        ]
                    },
                    {
                        name: "Unit 5 : Propositional Logic",
                        topics: [
                            "Propositional Logic",
                            "Proposition",
                            "First Order Logic",
                            "Basic Logical Operations",
                            "Truth Tables",
                            "Tautologies",
                            "Contradictions",
                            "Algebra of Proposition",
                            "Logical Implications",
                            "Logical Equivalence",
                            "Predicates",
                            "Universal Quantifiers",
                            "Existential Quantifiers"
                        ]
                    }
                ]
            },

            // ── Digital Electronics ────────────────
            {
                id: "de",
                name: "Digital Electronics",
                icon: "⚡",
                units: [
                    {
                        name: "Unit 1 : Number Systems",
                        topics: [
                            "Number System",
                            "Decimal Number System",
                            "Binary Number System",
                            "Hexadecimal Number System",
                            "Octal Number System",
                            "BCD Code",
                            "Conversions",
                            "1's Complement",
                            "2's Complement",
                            "Signed Numbers",
                            "Unsigned Numbers",
                            "Binary Addition",
                            "Binary Subtraction",
                            "Binary Multiplication",
                            "Gray Code",
                            "Hamming Code"
                        ]
                    },
                    {
                        name: "Unit 2 : Logic Gates & Boolean Algebra",
                        topics: [
                            "Logic Gates",
                            "Boolean Algebra",
                            "Truth Tables",
                            "OR Gate",
                            "AND Gate",
                            "NOT Gate",
                            "XOR Gate",
                            "Universal Gates",
                            "NOR Gate",
                            "NAND Gate",
                            "Boolean Theorems",
                            "De Morgan's Theorems"
                        ]
                    },
                    {
                        name: "Unit 3 : Combinational Logic",
                        topics: [
                            "Combinational Logic Analysis and Design",
                            "Standard Representation of Logic Functions",
                            "SOP (Sum of Products)",
                            "POS (Product of Sums)",
                            "Minimization Techniques",
                            "Karnaugh Map (K-Map)",
                            "Multiplexer (2:1)",
                            "Multiplexer (4:1)",
                            "Multiplexer (8:1)",
                            "Multiplexer (16:1)",
                            "Demultiplexer (1:2)",
                            "Demultiplexer (1:4)",
                            "Demultiplexer (1:8)",
                            "Adder",
                            "Half Adder",
                            "Full Adder",
                            "Subtractor using Adder",
                            "Encoder (8-to-3)",
                            "Decoder (3-to-8)",
                            "Code Converter",
                            "Binary to BCD Converter",
                            "BCD to Binary Converter"
                        ]
                    },
                    {
                        name: "Unit 4 : Sequential Logic",
                        topics: [
                            "Sequential Logic Design",
                            "Latch",
                            "Flip-Flop",
                            "S-R Flip-Flop",
                            "J-K Flip-Flop",
                            "T Flip-Flop",
                            "D Flip-Flop",
                            "Clocked Flip-Flops",
                            "Registers",
                            "Counters",
                            "Ripple Counter",
                            "Synchronous Counter",
                            "Asynchronous Counter",
                            "Ring Counter",
                            "Modulus Counter",
                            "State Table",
                            "State Diagram",
                            "Sequential Machines"
                        ]
                    },
                    {
                        name: "Unit 5 : A/D and D/A Converters",
                        topics: [
                            "A/D and D/A Converters",
                            "D/A Conversion",
                            "Weighted Register D/A Converter",
                            "R-2R Ladder D/A Converter",
                            "A/D Conversion",
                            "Counter Type A/D Converter",
                            "Dual Slope Integrator Method"
                        ]
                    }
                ]
            },

            // ── Web Designing ──────────────────────
            {
                id: "web",
                name: "Web Designing",
                icon: "🌐",
                units: [
                    {
                        name: "Unit 1 : Web Design Principles",
                        topics: [
                            "Web Design Principles",
                            "Basic Principles involved in Developing a Website",
                            "Planning Process",
                            "Rules of Web Designing",
                            "Designing Navigation Bar",
                            "Page Design",
                            "Home Page Layout",
                            "Design Concept",
                            "Basics of Web Design",
                            "Brief History of Internet",
                            "World Wide Web (WWW)",
                            "Web Standards"
                        ]
                    },
                    {
                        name: "Unit 2 : Introduction to HTML",
                        topics: [
                            "Introduction to HTML",
                            "Basic Structure of an HTML Document",
                            "Creating an HTML Document",
                            "Markup Tags",
                            "Heading Tags",
                            "Paragraph Tags",
                            "Line Break Tags",
                            "HTML Tags",
                            "HTML Elements"
                        ]
                    },
                    {
                        name: "Unit 3 : HTML Advanced",
                        topics: [
                            "Working with Text",
                            "Working with Lists",
                            "Tables",
                            "Frames",
                            "Hyperlinks",
                            "Images",
                            "Multimedia",
                            "Forms",
                            "Form Controls",
                            "PHP Scripting Language",
                            "Embedding PHP in HTML Page"
                        ]
                    },
                    {
                        name: "Unit 4 : CSS",
                        topics: [
                            "Introduction to Cascading Style Sheets (CSS)",
                            "Concept of CSS",
                            "Creating Style Sheet",
                            "CSS Properties",
                            "Background",
                            "Text Format",
                            "Controlling Fonts",
                            "Working with Block Elements",
                            "Working with Objects",
                            "Working with Lists",
                            "Working with Tables",
                            "CSS ID",
                            "CSS Class"
                        ]
                    },
                    {
                        name: "Unit 5 : Web Publishing",
                        topics: [
                            "Introduction to Web Publishing",
                            "Introduction to Hosting",
                            "Creating the Website",
                            "Saving the Website",
                            "Creating Title for Web Pages"
                        ]
                    }
                ]
            },

            // ── Hindi ──────────────────────────────
            {
                id: "hindi",
                name: "Hindi",
                icon: "📖",
                units: [
                    {
                        name: "पद्य भाग",
                        topics: [
                            "रात हो न निकला करे पथ का",
                            "हिमगिरि के आंगन में",
                            "नारी शिक्षा का द्वार (गान को)",
                            "हिंदी",
                            "हम अभिवंदन",
                            "अशीष की रानी",
                            "गीत फरोश",
                            "बादल का शब्द देखता है",
                            "पहाड़ आदमी",
                            "मै हार नहीं मानूंगा",
                            "शहीदों की माँ"
                        ]
                    },
                    {
                        name: "गद्य भाग",
                        topics: [
                            "सच्चे मनुष्य बनने हैं",
                            "गद्य का स्वरूप",
                            "गाँव बनाम गुलाब",
                            "नगरी नवरी के फेरे",
                            "बस एक बूंद देसी",
                            "असमुन्न चेतना",
                            "उसकी",
                            "गाँवों की गोद में पेड़ (आलम कहना है)",
                            "महाकाल से साक्षी घाट (सौंदर्य की नदी नर्मदा से)",
                            "भवानी वर्मा",
                            "हिंदी हमारी मातृ भाषा है"
                        ]
                    },
                    {
                        name: "व्याकरण भाग",
                        topics: [
                            "संधि",
                            "समास",
                            "उपसर्ग",
                            "प्रत्यय",
                            "विलोम",
                            "पर्यायवाची",
                            "शाब्दिक शुद्धता एवं वाक्य",
                            "वाक्यांश",
                            "मुहावरे",
                            "लोकोक्तियाँ",
                            "शब्द युग्म",
                            "अनेकार्थी शब्द",
                            "पारिभाषिक शब्दावली",
                            "तत्सम",
                            "तद्भव",
                            "देशज"
                        ]
                    }
                ]
            }

        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 2
    // ════════════════════════════════════════
    "IMCA_2": {
        semester: "IMCA Semester 2",
        subjects: [

            // ── Data Structures ────────────────────
            {
                id: "ds",
                icon: "🗂️",
                name: "Data Structures",
                units: [
                    {
                        name: "Unit 1 : Introduction to Data Structures",
                        topics: [
                            "Introduction to Programming Methodologies",
                            "Design of Algorithms",
                            "Structured Programming Concepts",
                            "Introduction to Data Structures",
                            "Arrays",
                            "Array Representation",
                            "Operations on Arrays",
                            "Insertion in Array",
                            "Deletion in Array",
                            "Searching in Array",
                            "Traversal of Array",
                            "Multidimensional Arrays",
                            "Organization of Multidimensional Arrays",
                            "Sparse Arrays",
                            "Applications of Sparse Arrays"
                        ]
                    },
                    {
                        name: "Unit 2 : Linked List",
                        topics: [
                            "Concept of Linked List",
                            "Difference between Array and Linked List",
                            "Singly Linked List",
                            "Representation of Singly Linked List",
                            "Traversal in Singly Linked List",
                            "Insertion at First Node",
                            "Insertion at Last Node",
                            "Insertion at Given Position",
                            "Insertion after a Given Node",
                            "Deletion of First Node",
                            "Deletion of Last Node",
                            "Deletion at Given Position",
                            "Deletion after a Given Node",
                            "Doubly Linked List",
                            "Representation of Doubly Linked List",
                            "Traversal in Doubly Linked List",
                            "Insertion in Doubly Linked List",
                            "Deletion in Doubly Linked List",
                            "Circular Linked List",
                            "Representation of Circular Linked List",
                            "Header Linked List",
                            "Applications of Linked List"
                        ]
                    },
                    {
                        name: "Unit 3 : Stack and Queue",
                        topics: [
                            "Introduction to Stack",
                            "Operations on Stack",
                            "Push Operation",
                            "Pop Operation",
                            "Traversal of Stack",
                            "Array Representation of Stack",
                            "Linked List Representation of Stack",
                            "Programs on Stack",
                            "Applications of Stack",
                            "Introduction to Queue",
                            "Operations on Queue",
                            "Insert Operation",
                            "Delete Operation",
                            "Array Representation of Queue",
                            "Linked List Representation of Queue",
                            "Circular Queue",
                            "Representation of Circular Queue",
                            "Priority Queue",
                            "Applications of Queue"
                        ]
                    },
                    {
                        name: "Unit 4 : Sorting Techniques",
                        topics: [
                            "Sorting Introduction",
                            "Bubble Sort",
                            "Selection Sort",
                            "Insertion Sort",
                            "Quick Sort",
                            "Merge Sort",
                            "Heap Sort",
                            "Radix Sort",
                            "Comparison of Sorting Techniques"
                        ]
                    },
                    {
                        name: "Unit 5 : Trees and Graphs",
                        topics: [
                            "Tree Terminology",
                            "Binary Tree",
                            "Complete Binary Tree",
                            "Binary Search Tree",
                            "Tree Traversals",
                            "Preorder Traversal",
                            "Inorder Traversal",
                            "Postorder Traversal",
                            "Creation of Binary Tree using Traversals",
                            "Expression Tree",
                            "Expression Manipulation",
                            "Insertion in Binary Search Tree",
                            "Deletion in Binary Search Tree",
                            "Programs on BST",
                            "Introduction to Graph",
                            "Graph Terminology",
                            "Graph Representation",
                            "Path Matrix",
                            "Breadth First Search (BFS)",
                            "Depth First Search (DFS)"
                        ]
                    }
                ]
            },

            // ── Computer Architecture ──────────────
            {
                id: "ca",
                icon: "🖥️",
                name: "Computer Architecture",
                units: [
                    {
                        name: "Unit 1 : Basic Computer Organization and Design",
                        topics: [
                            "Introduction to Computer Organization",
                            "Basic Computer Organization",
                            "Computer Design",
                            "Computer Registers",
                            "General Purpose Registers",
                            "Special Purpose Registers",
                            "Bus System",
                            "Common Bus System",
                            "Instruction Set",
                            "Machine Instructions",
                            "Timing and Control",
                            "Control Unit",
                            "Instruction Cycle",
                            "Fetch Cycle",
                            "Decode Cycle",
                            "Execute Cycle",
                            "Memory Reference Instructions",
                            "Input Operations",
                            "Output Operations",
                            "Interrupt",
                            "Interrupt Cycle",
                            "Interconnection Structures",
                            "Bus Interconnection",
                            "Design of Basic Computer"
                        ]
                    },
                    {
                        name: "Unit 2 : Central Processing Unit",
                        topics: [
                            "Introduction to CPU",
                            "Register Organization",
                            "Arithmetic Micro Operations",
                            "Logical Micro Operations",
                            "Shift Micro Operations",
                            "Stack Organization",
                            "Micro Programmed Control",
                            "Instruction Formats",
                            "Addressing Modes",
                            "Instruction Codes",
                            "Machine Language",
                            "Assembly Language",
                            "Input Output Programming",
                            "RISC Architecture",
                            "CISC Architecture",
                            "Difference between RISC and CISC",
                            "Pipeline Architecture",
                            "Parallel Architecture"
                        ]
                    },
                    {
                        name: "Unit 3 : Memory Organization",
                        topics: [
                            "Memory Organization",
                            "Memory Hierarchy",
                            "Cache Memory",
                            "Cache Hit",
                            "Cache Miss",
                            "Hit Ratio",
                            "Associative Memory",
                            "Memory Mapping",
                            "Direct Mapping",
                            "Associative Mapping",
                            "Set Associative Mapping",
                            "Virtual Memory",
                            "Virtual Memory Organization"
                        ]
                    },
                    {
                        name: "Unit 4 : Input Output Organization",
                        topics: [
                            "Input Output Organization",
                            "External Devices",
                            "I/O Modules",
                            "Programmed I/O",
                            "Interrupt Driven I/O",
                            "Direct Memory Access (DMA)",
                            "DMA Controller",
                            "I/O Channels"
                        ]
                    },
                    {
                        name: "Unit 5 : IC Digital Logic Families",
                        topics: [
                            "Introduction to Digital Logic Families",
                            "Characteristics of Logic Families",
                            "Speed",
                            "Power Consumption",
                            "Fan In",
                            "Fan Out",
                            "Noise Immunity",
                            "Operating Voltage",
                            "Propagation Delay",
                            "Bipolar Transistor",
                            "Bipolar Transistor as Current Controlled Switch",
                            "MOSFET",
                            "MOSFET as Voltage Controlled Switch",
                            "RTL",
                            "DTL",
                            "TTL",
                            "ECL",
                            "MOS Logic",
                            "CMOS",
                            "Comparison of Logic Families"
                        ]
                    }
                ]
            },

            // ── Graphics Design & Animation ────────
            {
                id: "graphics",
                icon: "🎨",
                name: "Graphics Design & Animation",
                units: [
                    {
                        name: "Unit 1 : Introduction to Graphic Design",
                        topics: [
                            "Multimedia Fundamentals",
                            "What is Graphic Design",
                            "What is Raster Graphics",
                            "What is Vector Graphics",
                            "Uses of Raster Graphics",
                            "Uses of Vector Graphics",
                            "Difference between Raster and Vector Graphics",
                            "Media",
                            "Types of Media",
                            "Difference between Multimedia and Graphic Designing",
                            "Colour Formats",
                            "Types of Colour Formats",
                            "Colour Formats for Print Media",
                            "Colour Formats for Digital Media",
                            "Basic Colours",
                            "Colour Theory"
                        ]
                    },
                    {
                        name: "Unit 2 : Working with Images",
                        topics: [
                            "Image Size",
                            "Image Resolution",
                            "Image Editing",
                            "Color Modes",
                            "Color Adjustments",
                            "Backgrounds",
                            "Making Selections",
                            "Lasso Tool",
                            "Selection Tool",
                            "Polygon Lasso Tool",
                            "Magnetic Lasso Tool",
                            "Magic Wand Tool",
                            "Grow Command",
                            "Similar Command",
                            "Moving a Portion of Image",
                            "Editing Selections",
                            "Filling a Selection",
                            "Transforming Selection",
                            "Painting Tools",
                            "Drawing Tools",
                            "Retouching Tools"
                        ]
                    },
                    {
                        name: "Unit 3 : Layers and Filters",
                        topics: [
                            "Layers",
                            "Type Tool",
                            "Converting Layers",
                            "Image Masking",
                            "Filters",
                            "Filter Menu",
                            "Artistic Filters",
                            "Blur Filters",
                            "Brush Stroke Filters",
                            "Distort Filters",
                            "Noise Filters",
                            "Pixelate Filters",
                            "Lighting Effects",
                            "Difference Clouds",
                            "Sharpen Filters",
                            "Printing"
                        ]
                    },
                    {
                        name: "Unit 4 : Adobe Illustrator",
                        topics: [
                            "Introduction to Illustrator",
                            "GUI of Illustrator",
                            "Illustrator Toolbox",
                            "Using Menus",
                            "Drawing Basic Shapes",
                            "Pencil Tool",
                            "Pen Tool",
                            "Brush Tool",
                            "Compound Paths",
                            "Colors and Strokes",
                            "Editing Objects",
                            "Layers",
                            "Groups",
                            "Transparency",
                            "Graphic Styles",
                            "Transforming Objects",
                            "Moving Objects",
                            "Basic Text",
                            "Blending Shapes",
                            "Blending Colors"
                        ]
                    },
                    {
                        name: "Unit 5 : Animation",
                        topics: [
                            "Introduction to Animation",
                            "History of Animation",
                            "Early Examples of Animation",
                            "Stop Motion Animation",
                            "Photo Animation",
                            "Paper Animation",
                            "Types of Animation",
                            "Flash Overview",
                            "Adobe Animate Interface",
                            "FLA File Format",
                            "SWF File Format"
                        ]
                    }
                ]
            },

            // ── Graph Theory & Discrete Structures ─
            {
                id: "graph",
                icon: "📊",
                name: "Graph Theory & Discrete Structures",
                units: [
                    {
                        name: "Unit 1 : Graphs",
                        topics: [
                            "Introduction to Graphs",
                            "Types of Graphs",
                            "Operations on Graphs",
                            "Bipartite Graph",
                            "Subgraph",
                            "Distance of a Graph",
                            "Cut Edges",
                            "Cut Vertices",
                            "Isomorphic Graphs",
                            "Homomorphic Graphs",
                            "Degree of Graph",
                            "Adjacent Matrix",
                            "Incidence Matrix",
                            "Hamiltonian Graph",
                            "Graph Colouring"
                        ]
                    },
                    {
                        name: "Unit 2 : Paths and Planar Graphs",
                        topics: [
                            "Path",
                            "Simple Path",
                            "Circuit",
                            "Simple Circuit",
                            "Floyd Algorithm",
                            "Warshall Algorithm",
                            "Spanning Tree",
                            "Minimum Spanning Tree",
                            "Planar Graph",
                            "Euler Formula",
                            "K5 Graph",
                            "K3,3 Graph"
                        ]
                    },
                    {
                        name: "Unit 3 : Counting Techniques",
                        topics: [
                            "Introduction to Counting",
                            "Sum Rule",
                            "Product Rule",
                            "Principle of Inclusion",
                            "Principle of Exclusion",
                            "Principle of Inclusion and Exclusion",
                            "Pigeon Hole Principle",
                            "Counting by Bijections"
                        ]
                    },
                    {
                        name: "Unit 4 : Recurrence Relations",
                        topics: [
                            "Linear Recurrence Relations",
                            "Homogeneous Recurrence Relations",
                            "Non Homogeneous Recurrence Relations",
                            "Generating Functions",
                            "Permutations",
                            "Combinations"
                        ]
                    },
                    {
                        name: "Unit 5 : Lattices and Algebraic Systems",
                        topics: [
                            "Introduction to Lattices",
                            "Bounded Lattice",
                            "Algebraic Systems",
                            "Principle of Duality",
                            "Basic Properties of Lattices",
                            "Sublattices",
                            "Distributive Lattice",
                            "Complemented Lattice"
                        ]
                    }
                ]
            },

            // ── English ────────────────────────────
            {
                id: "english",
                icon: "📝",
                name: "English",
                units: [
                    {
                        name: "Unit 1 : Grammar",
                        topics: [
                            "Writing Correctly",
                            "Transformation of Sentences",
                            "Incorrect to Correct English",
                            "Tenses",
                            "Replacing Single Word for Group of Words"
                        ]
                    },
                    {
                        name: "Unit 2 : Writing Skills",
                        topics: [
                            "Letter Writing",
                            "Official Correspondence",
                            "Business Correspondence",
                            "Curriculum Vitae (CV)",
                            "Technical Reports",
                            "Types of Technical Reports",
                            "Comprehension",
                            "Paragraph Writing (200 Words)",
                            "Current Topics",
                            "Notice Writing",
                            "Agenda Writing",
                            "Circular Writing"
                        ]
                    },
                    {
                        name: "Unit 3 : Secretarial Skills",
                        topics: [
                            "Effective Communication",
                            "Listening Skills",
                            "Feedback Skills",
                            "Telephone Handling",
                            "Attending Meetings",
                            "Preparing Agenda",
                            "Writing Minutes",
                            "Writing Summaries",
                            "Handling Problem Situations",
                            "Voice Control",
                            "Use of Phonetics"
                        ]
                    },
                    {
                        name: "Unit 4 : Professional Skills",
                        topics: [
                            "Effective Use of Kinesics",
                            "Planning Interviews",
                            "Making Presentations",
                            "Group Discussions"
                        ]
                    },
                    {
                        name: "Unit 5 : Manuals and Proposals",
                        topics: [
                            "Writing Manuals",
                            "Making Proposals",
                            "Case Study"
                        ]
                    }
                ]
            },

            // ── Lab ────────────────────────────────
            {
                id: "lab",
                icon: "🔬",
                name: "Lab",
                units: [
                    {
                        name: "Data Structure Lab",
                        topics: [
                            "Array Programs",
                            "Linked List Programs",
                            "Stack Programs",
                            "Queue Programs",
                            "Sorting Programs",
                            "Tree Programs",
                            "Graph Programs"
                        ]
                    },
                    {
                        name: "Graphics Design Lab",
                        topics: [
                            "Photoshop Practical",
                            "Image Editing",
                            "Selection Tools",
                            "Layers",
                            "Filters",
                            "Illustrator Practical",
                            "Animation Practical"
                        ]
                    }
                ]
            }

        ]
    }

    // Add more semesters here as needed:
    // "IMCA_3": { semester: "IMCA Semester 3", subjects: [...] },
    // "MCA_1":  { semester: "MCA Semester 1",  subjects: [...] },

};

// ── Helper: get syllabus for a given profile ──────────────
// profile = { branch: "IMCA", semester: "1" }
export function getSyllabus(profile) {
    if (!profile) return null;
    const key = `${profile.branch}_${profile.semester}`;
    return allSyllabi[key] || null;
}

// ── Backward-compat default (IMCA Sem 2) ─────────────────
export const syllabus = allSyllabi["IMCA_2"];