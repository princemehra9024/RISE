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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Dynamic Memory Allocation",
                            "malloc()",
                            "calloc()",
                            "realloc()",
                            "free()",
                            "Dangling Pointers",
                            "Avoiding Memory Leaks",
                            "Bit Manipulation",
                            "Bitwise Operations",
                            "Bit Masking",
                            "Flags",
                            "Competitive Programming Hacks",
                            "File Systems I/O",
                            "Handling Text Files",
                            "Handling Binary Files",
                            "fseek()",
                            "ftell()",
                            "rewind()",
                            "GCC Compiler Flags",
                            "GDB Debugging Basics",
                            "Writing Makefiles",
                            "Modular C Programming"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Proof Techniques",
                            "Proof by Mathematical Induction",
                            "Proof by Contradiction",
                            "Direct Proofs",
                            "Recurrence Relations",
                            "Solving Recurrences via Substitution",
                            "Master Theorem",
                            "Combinatorics",
                            "Pigeonhole Principle Applications",
                            "Permutation & Combination Programming Logic"
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
                            "Demultiplexer (1:2)",
                            "Demultiplexer (1:4)",
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "HDL Introduction",
                            "Verilog Basics",
                            "VHDL Basics & Syntax Structure",
                            "FPGA vs ASIC Concepts",
                            "Modern Digital System Design",
                            "Clock Skew",
                            "Setup & Hold Times",
                            "Propagation Delay",
                            "Hazard Mitigation"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Responsive UI",
                            "CSS Flexbox",
                            "CSS Grid",
                            "Media Queries",
                            "Mobile-First Responsive Layouts",
                            "Tailwind CSS",
                            "Bootstrap 5",
                            "Modern JavaScript (ES6+)",
                            "DOM Manipulation",
                            "Event Handling",
                            "Promises",
                            "Fetch API",
                            "Async/Await",
                            "Git & GitHub Basics",
                            "Deploying with GitHub Pages",
                            "Deploying with Vercel"
                        ]
                    }
                ]
            },

            // ── Lab (Sem 1) ─────────────────────────
            {
                id: "lab1",
                name: "Lab: C Programming & Web Designing",
                icon: "🔬",
                units: [
                    {
                        name: "C Programming Lab",
                        topics: [
                            "Array Programs",
                            "Pointer Programs",
                            "Structure Programs",
                            "File Operation Programs"
                        ]
                    },
                    {
                        name: "Web Designing Lab",
                        topics: [
                            "HTML Web Pages",
                            "CSS Styling Practice",
                            "Embedded PHP Scripts",
                            "CMS Basics (WordPress/Joomla)"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "VS Code Setup & Extensions",
                            "Debugging Setup in VS Code",
                            "Linter Configuration",
                            "Headless CMS Overview (Strapi/Sanity)",
                            "Static Site Integration"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Technical Documentation Writing",
                            "Translating Tech Requirements into Regional Clarity"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Complexity Benchmarking",
                            "Practical Big-O Profiling",
                            "Space-Time Tradeoffs",
                            "Trie (Prefix Tree)",
                            "Disjoint Set Union (DSU / Union-Find)",
                            "Segment Trees",
                            "Two-Pointer Technique",
                            "Sliding Window Patterns",
                            "Monotonic Stacks",
                            "C++ STL: std::vector",
                            "C++ STL: std::list",
                            "C++ STL: std::map",
                            "C++ STL: std::unordered_map",
                            "C++ STL: std::priority_queue"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Modern Multi-Core Architectures",
                            "Hyper-Threading",
                            "Multi-Core Scheduling",
                            "Cache Coherency (MESI Protocol)",
                            "Translation Lookaside Buffer (TLB)",
                            "Virtual-to-Physical Page Address Translation",
                            "Pipelining Hazards",
                            "Structural Hazards",
                            "Data Hazards",
                            "Control Hazards",
                            "Branch Prediction",
                            "Speculative Execution"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Modern Product UI/UX",
                            "Figma Prototyping",
                            "Adobe XD Prototyping",
                            "Design Systems & Components",
                            "Auto-Layout",
                            "CSS Animations",
                            "SVG Styling",
                            "Lottie Framework",
                            "GSAP Library",
                            "Asset Exports (WebP)",
                            "SVG Optimization",
                            "Responsive Image Resolutions"
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Dijkstra's Algorithm",
                            "Bellman-Ford Algorithm",
                            "A* Graph Exploration",
                            "Kruskal's Algorithm (MST)",
                            "Prim's Algorithm (MST)",
                            "Disjoint Sets for MST",
                            "Topological Sort (Kahn's Algorithm)",
                            "Directed Acyclic Graphs (DAG)",
                            "DAG in Build Systems"
                        ]
                    }
                ]
            },

            // ── Lab (Sem 2) ────────────────────────
            {
                id: "lab2",
                icon: "🔬",
                name: "Lab: Data Structure & Graphics",
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
            },

            // ── English ────────────────────────────
            {
                id: "english",
                icon: "📝",
                name: "Technical Writing & Communication in English",
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
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Writing Clear PR Descriptions",
                            "Git Commit Messages Best Practices",
                            "Writing README.md Files",
                            "Structuring Developer Portfolio",
                            "Cold Email Outreach for Internships"
                        ]
                    }
                ]
            }

        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 3
    // ════════════════════════════════════════
    "IMCA_3": {
        semester: "IMCA Semester 3",
        subjects: [

            // ── Object Oriented Programming Using C++ ──
            {
                id: "cpp",
                name: "Object Oriented Programming Using C++",
                icon: "⚙️",
                units: [
                    {
                        name: "Unit 1 : Principles of OOP",
                        topics: [
                            "Principles of Object Oriented Programming",
                            "The Traditional Approach",
                            "Shortcomings of Procedure Oriented Languages",
                            "Basic Concepts of OOP",
                            "Encapsulation",
                            "Abstraction",
                            "Inheritance",
                            "Polymorphism",
                            "Benefits of OOP",
                            "Object Oriented Languages"
                        ]
                    },
                    {
                        name: "Unit 2 : Programming Basics in C++",
                        topics: [
                            "Input/Output using cin/cout",
                            "Preprocessor Directives",
                            "Basic Data Types",
                            "User Defined Data Types",
                            "Operators in C++",
                            "Loops in C++",
                            "Decision Making Statements",
                            "Control Statements",
                            "Functions in C++",
                            "Pointers to Functions"
                        ]
                    },
                    {
                        name: "Unit 3 : Classes & Operator Overloading",
                        topics: [
                            "Class Definition",
                            "Class Objects",
                            "Class Member Functions",
                            "Static Class Members",
                            "Class Scope",
                            "Nested Classes",
                            "Local Classes",
                            "Composite Class",
                            "Constructor",
                            "Destructor",
                            "Friends",
                            "this Pointer",
                            "Operator Overloading",
                            "Overloading Unary Operators",
                            "Overloading Binary Operators",
                            "Overloading [] Operator",
                            "Overloading () Operator",
                            "Overloading ++ and -- Operators",
                            "Overloading << and >> Operators"
                        ]
                    },
                    {
                        name: "Unit 4 : Inheritance & Polymorphism",
                        topics: [
                            "Class Hierarchy Definition",
                            "Identifying Members of Hierarchy",
                            "Base Class Member Access",
                            "Base and Derived Class Construction",
                            "Memberwise Initialization",
                            "Memberwise Assignment",
                            "Virtual Functions",
                            "Pure Virtual Functions",
                            "Multiple Inheritance",
                            "Class Scope Under Inheritance",
                            "Virtual Classes",
                            "Runtime Polymorphism"
                        ]
                    },
                    {
                        name: "Unit 5 : Templates & Exception Handling",
                        topics: [
                            "Templates",
                            "Class Templates",
                            "Function Templates",
                            "Exception Handling",
                            "Throwing Exceptions",
                            "The try...catch Block",
                            "Exception Specifications",
                            "Standard Exceptions"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Modern C++ (C++11/14/17/20)",
                            "auto Keyword",
                            "Lambda Expressions",
                            "Range-Based for Loops",
                            "nullptr",
                            "constexpr",
                            "Smart Pointers",
                            "std::unique_ptr",
                            "std::shared_ptr",
                            "std::weak_ptr",
                            "RAII Idiom",
                            "Move Semantics",
                            "Rvalue References (&&)",
                            "std::move",
                            "Move Constructors",
                            "Perfect Forwarding",
                            "STL: std::sort",
                            "STL: std::find_if",
                            "STL: std::accumulate"
                        ]
                    }
                ]
            },

            // ── Systems Programming ─────────────────
            {
                id: "sp",
                name: "Systems Programming",
                icon: "🛠️",
                units: [
                    {
                        name: "Unit 1 : Introduction to System Software",
                        topics: [
                            "Introduction to System Software",
                            "Evolution of System Software",
                            "General Machine Architecture",
                            "Memory",
                            "Registers",
                            "Data",
                            "Instructions",
                            "Simplified Instructional Computer (SIC)",
                            "Traditional (CISC) Architectures",
                            "RISC Architectures"
                        ]
                    },
                    {
                        name: "Unit 2 : Assemblers & Compilers",
                        topics: [
                            "Elements of Assembly Language Programming",
                            "Overview of Assembly Process",
                            "Assembler Features and Functions",
                            "Load and Go Assembler",
                            "One-Pass Assembler",
                            "Two-Pass Assembler",
                            "Phases of a Compiler",
                            "Introduction to Interpreters",
                            "Software Tools for Program Entry & Testing",
                            "Line Editors",
                            "Screen Editors",
                            "Debug Monitors"
                        ]
                    },
                    {
                        name: "Unit 3 : Loaders and Linkers",
                        topics: [
                            "Basic Loader Functions and Features",
                            "Compile & Go Loader",
                            "Absolute Loader",
                            "Relocating Loader",
                            "Direct Linking Loader",
                            "Subroutine Linkage Loader",
                            "Binders",
                            "Linking Loaders",
                            "Relocation",
                            "Program Linking",
                            "Static Linking",
                            "Dynamic Linking"
                        ]
                    },
                    {
                        name: "Unit 4 : Macro Processors",
                        topics: [
                            "Basic Macro Processor Functions",
                            "Machine-Dependent Macro Processor Features",
                            "Machine-Independent Macro Processor Features",
                            "Macro Processor Design Options",
                            "Implementation Examples"
                        ]
                    },
                    {
                        name: "Unit 5 : Structured Programming & HLL",
                        topics: [
                            "Structured Programming",
                            "Applications of Structured Programming",
                            "Construction of System Software Tools",
                            "Features of Higher Level Languages (HLL)",
                            "Importance of HLL",
                            "Extensive Data Types and Structures",
                            "Scope Rules",
                            "Storage Allocation",
                            "Functional Modularity"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Linux System Calls",
                            "fork()",
                            "exec()",
                            "wait()",
                            "pipe()",
                            "dup2()",
                            "POSIX Threads",
                            "pthread Creation",
                            "Mutex Locks",
                            "Condition Variables",
                            "Binary Analysis",
                            "Understanding ELF Binaries",
                            "objdump & readelf",
                            "Dynamic Shared Objects (.so)"
                        ]
                    }
                ]
            },

            // ── Database Systems ────────────────────
            {
                id: "dbms",
                name: "Database Systems",
                icon: "🗄️",
                units: [
                    {
                        name: "Unit 1 : Introduction to DBMS",
                        topics: [
                            "Introduction to DBMS",
                            "Basic DBMS Terminology",
                            "Database System vs File System",
                            "Data Independence",
                            "Architecture of DBMS",
                            "Entity Relationship Model",
                            "Basic Concepts of ER Model",
                            "Keys",
                            "Design Issues",
                            "E-R Diagram",
                            "Weak Entity Sets",
                            "Extended E-R Features",
                            "Reduction of E-R Scheme to Tables"
                        ]
                    },
                    {
                        name: "Unit 2 : Relational Model & SQL",
                        topics: [
                            "Relational Model",
                            "Structure of Relational Database",
                            "Relational Algebra",
                            "Tuple Relational Calculus",
                            "Domain Relational Calculus",
                            "SQL Introduction",
                            "Basic SQL Structure",
                            "Set Operations in SQL",
                            "Aggregate Functions",
                            "NULL Values in SQL"
                        ]
                    },
                    {
                        name: "Unit 3 : Database Design & Normalization",
                        topics: [
                            "Database Design",
                            "Functional Dependencies",
                            "Normal Forms",
                            "First Normal Form (1NF)",
                            "Second Normal Form (2NF)",
                            "Third Normal Form (3NF)",
                            "BCNF",
                            "Multi-Valued Dependencies",
                            "Fourth Normal Form (4NF)",
                            "Join Dependencies"
                        ]
                    },
                    {
                        name: "Unit 4 : Query Processing & Transactions",
                        topics: [
                            "Query Processing",
                            "Query Optimization",
                            "Transaction Processing Concepts",
                            "ACID Properties",
                            "Concurrency Control Techniques",
                            "Locking Techniques",
                            "Time Stamping",
                            "Recovery",
                            "Integrity of Database",
                            "Security of Database"
                        ]
                    },
                    {
                        name: "Unit 5 : Distributed Database Systems",
                        topics: [
                            "Distributed Database System",
                            "Fragments of Relations",
                            "Distributed Query Optimization",
                            "Distributed Concurrency Control",
                            "Management of Deadlocks",
                            "Crash Management",
                            "Database Recovery Management"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "NoSQL Databases",
                            "MongoDB Schema Design",
                            "Redis Data Types & TTL",
                            "Window Functions (ROW_NUMBER, DENSE_RANK)",
                            "LEAD/LAG Functions",
                            "Common Table Expressions (WITH clause)",
                            "B+ Tree Index Mechanics",
                            "Clustered vs Non-Clustered Indexing",
                            "Query Plan Profiling (EXPLAIN ANALYZE)",
                            "Connection Pooling (HikariCP)",
                            "Object Relational Mapping (ORM)",
                            "Hibernate / Prisma Basics"
                        ]
                    }
                ]
            },

            // ── Statistics & Probability ────────────
            {
                id: "stats",
                name: "Statistics and Probability",
                icon: "📈",
                units: [
                    {
                        name: "Unit 1 : Probability",
                        topics: [
                            "Probability",
                            "Sample Space",
                            "Axioms of Probability",
                            "Probability on Finite Sample Spaces",
                            "Conditional Probability",
                            "Bayes' Theorem",
                            "Independence of Events",
                            "Random Variables"
                        ]
                    },
                    {
                        name: "Unit 2 : Discrete Distributions",
                        topics: [
                            "Standard Discrete Distributions",
                            "Binomial Distribution",
                            "Poisson Distribution",
                            "Geometric Distribution",
                            "Properties of Binomial Distribution",
                            "Properties of Poisson Distribution",
                            "Properties of Geometric Distribution"
                        ]
                    },
                    {
                        name: "Unit 3 : Continuous Distributions",
                        topics: [
                            "Standard Continuous Distributions",
                            "Uniform Distribution",
                            "Normal Distribution",
                            "Exponential Distribution",
                            "Properties of Uniform Distribution",
                            "Properties of Normal Distribution",
                            "Properties of Exponential Distribution"
                        ]
                    },
                    {
                        name: "Unit 4 : Correlation & Regression",
                        topics: [
                            "Correlation",
                            "Rank Correlation",
                            "Regression Analysis",
                            "Linear Regression",
                            "Regression Coefficients"
                        ]
                    },
                    {
                        name: "Unit 5 : Curve Fitting",
                        topics: [
                            "Curve Fitting by Method of Least Squares",
                            "Fitting of Straight Lines",
                            "Fitting Polynomials",
                            "Fitting Exponential Curves"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Inferential Statistics",
                            "Hypothesis Testing",
                            "p-Values",
                            "Null and Alternative Hypotheses",
                            "t-Tests",
                            "Chi-Square Tests",
                            "Python Scipy.stats Library",
                            "Python Statsmodels Library",
                            "Central Limit Theorem",
                            "Sampling Distributions",
                            "Empirical Rule Simulations"
                        ]
                    }
                ]
            },

            // ── Lab (Sem 3) ─────────────────────────
            {
                id: "lab3",
                name: "Lab: C++ & Database Systems",
                icon: "⌨️",
                units: [
                    {
                        name: "C++ Programming Lab",
                        topics: [
                            "Classes & Objects Programs",
                            "Operator Overloading Programs",
                            "Inheritance Programs",
                            "Polymorphic Behavior Programs",
                            "Template Programs",
                            "Exception Handling Programs"
                        ]
                    },
                    {
                        name: "Database Systems Lab",
                        topics: [
                            "DDL Practice (CREATE, ALTER, DROP)",
                            "DML Practice (INSERT, UPDATE, DELETE)",
                            "Complex JOINs",
                            "Subqueries",
                            "View Creation",
                            "Transaction Practice",
                            "MySQL/PostgreSQL Practice"
                        ]
                    }
                ]
            },

            // ── Environmental Science ───────────────
            {
                id: "env",
                name: "Environmental Science",
                icon: "🌿",
                units: [
                    {
                        name: "Unit 1 : Concept of Environment",
                        topics: [
                            "Concept of Environment",
                            "Nature of Environmental Studies",
                            "Scope of Environmental Studies",
                            "Approaches to Environmental Studies",
                            "Concept of Ecology"
                        ]
                    },
                    {
                        name: "Unit 2 : Ecosystem",
                        topics: [
                            "Ecosystem Definition",
                            "Structure of Ecosystem",
                            "Function of Ecosystem",
                            "Forest Ecosystem",
                            "Grassland Ecosystem",
                            "Desert Ecosystem",
                            "Aquatic Ecosystem",
                            "Components of Environment"
                        ]
                    },
                    {
                        name: "Unit 3 : Biodiversity & Energy",
                        topics: [
                            "Biodiversity",
                            "Energy Flow in Ecosystem",
                            "Productivity in Ecosystem",
                            "Ecological Pyramids"
                        ]
                    },
                    {
                        name: "Unit 4 : Food Chain & Food Web",
                        topics: [
                            "Food Chain",
                            "Food Web",
                            "Man-Environment Relationships"
                        ]
                    },
                    {
                        name: "Unit 5 : Conservation",
                        topics: [
                            "Degradation of Environment",
                            "Conservation of Environment",
                            "Development vs Ecological Crisis",
                            "Human Impact on Natural Environment"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Green Computing",
                            "Power Optimization in Data Centers",
                            "Hardware Recycling",
                            "Carbon Footprint of Cloud Workloads"
                        ]
                    }
                ]
            }

        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 4
    // ════════════════════════════════════════
    "IMCA_4": {
        semester: "IMCA Semester 4",
        subjects: [

            // ── Operating Systems ───────────────────
            {
                id: "os",
                name: "Operating Systems",
                icon: "💻",
                units: [
                    {
                        name: "Unit 1 : Introduction & CPU Scheduling",
                        topics: [
                            "What is an Operating System",
                            "Simple Batch Systems",
                            "Multi-Programmed Batch Systems",
                            "Time-Sharing Systems",
                            "Personal Computer Systems",
                            "Parallel Systems",
                            "Distributed Systems",
                            "Real-Time Systems",
                            "Process Concept",
                            "Process Scheduling",
                            "Operations on Processes",
                            "CPU Scheduling: Basic Concepts",
                            "Scheduling Criteria",
                            "Scheduling Algorithms",
                            "FCFS Scheduling",
                            "SJF Scheduling",
                            "Round Robin Scheduling",
                            "Priority Scheduling",
                            "Multiple-Processor Scheduling"
                        ]
                    },
                    {
                        name: "Unit 2 : Process Synchronization & Deadlocks",
                        topics: [
                            "Process Synchronization Background",
                            "The Critical-Section Problem",
                            "Synchronization Hardware",
                            "Semaphores",
                            "Classical Problems of Synchronization",
                            "Producer-Consumer Problem",
                            "Readers-Writers Problem",
                            "Dining Philosophers Problem",
                            "Deadlock System Model",
                            "Deadlock Characterization",
                            "Methods for Handling Deadlocks",
                            "Deadlock Prevention",
                            "Deadlock Avoidance",
                            "Banker's Algorithm",
                            "Deadlock Detection",
                            "Recovery from Deadlock"
                        ]
                    },
                    {
                        name: "Unit 3 : Memory Management & Virtual Memory",
                        topics: [
                            "Memory Management Background",
                            "Logical vs Physical Address Space",
                            "Swapping",
                            "Contiguous Allocation",
                            "Paging",
                            "Segmentation",
                            "Virtual Memory",
                            "Demand Paging",
                            "Page Replacement",
                            "FIFO Page Replacement",
                            "Optimal Page Replacement",
                            "LRU Page Replacement",
                            "Performance of Demand Paging",
                            "Allocation of Frames",
                            "Thrashing"
                        ]
                    },
                    {
                        name: "Unit 4 : Device & Storage Management",
                        topics: [
                            "Techniques for Device Management",
                            "Dedicated Devices",
                            "Shared Devices",
                            "Virtual Devices",
                            "Input/Output Devices",
                            "Storage Devices",
                            "Buffering",
                            "Disk Structure",
                            "Disk Scheduling",
                            "FCFS Disk Scheduling",
                            "SSTF Disk Scheduling",
                            "SCAN Disk Scheduling",
                            "C-SCAN Disk Scheduling",
                            "Disk Management",
                            "Swap-Space Management",
                            "Disk Reliability"
                        ]
                    },
                    {
                        name: "Unit 5 : File Systems & Security",
                        topics: [
                            "Information Management Introduction",
                            "Simple File System",
                            "General Model of a File System",
                            "Types of File System",
                            "File Concept",
                            "Access Methods",
                            "Sequential Access",
                            "Direct Access",
                            "Directory Structure",
                            "Single-Level Directory",
                            "Two-Level Directory",
                            "Tree-Structured Directory",
                            "Goals of Protection",
                            "Domain of Protection",
                            "Access Rights",
                            "Consistency Semantics",
                            "Authentication",
                            "Program Threats",
                            "System Threats",
                            "Encryption"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Linux Directory Tree",
                            "/proc Virtual File System",
                            "strace Command Line Profiling",
                            "Bash Scripting & Automation",
                            "Pipelines (grep, awk, sed)",
                            "Cron Jobs",
                            "OS-Level Virtualization",
                            "cgroups",
                            "Namespaces (Foundation of Docker)"
                        ]
                    }
                ]
            },

            // ── Computer Networks ───────────────────
            {
                id: "cn",
                name: "Computer Networks",
                icon: "🌐",
                units: [
                    {
                        name: "Unit 1 : Introduction to Computer Networks",
                        topics: [
                            "Network Definition",
                            "Network Topologies",
                            "Bus Topology",
                            "Star Topology",
                            "Ring Topology",
                            "Mesh Topology",
                            "Network Classifications",
                            "LAN, MAN, WAN",
                            "Network Protocol",
                            "Layered Network Architecture",
                            "OSI Reference Model",
                            "TCP/IP Protocol Suite"
                        ]
                    },
                    {
                        name: "Unit 2 : Data Communication Fundamentals",
                        topics: [
                            "Analog Signal",
                            "Digital Signal",
                            "Data-Rate Limits",
                            "Digital to Digital Line Encoding",
                            "NRZ, RZ, Manchester Encoding",
                            "Pulse Code Modulation (PCM)",
                            "Parallel Transmission",
                            "Serial Transmission",
                            "Digital to Analog Modulation",
                            "ASK, FSK, PSK",
                            "Multiplexing Techniques",
                            "Frequency Division Multiplexing (FDM)",
                            "Time Division Multiplexing (TDM)",
                            "Guided Transmission Media",
                            "Unguided Transmission Media"
                        ]
                    },
                    {
                        name: "Unit 3 : Switching Techniques & Access",
                        topics: [
                            "Circuit Switching",
                            "Packet Switching",
                            "Connectionless Datagram Switching",
                            "Connection-Oriented Virtual Circuit Switching",
                            "Dial-Up Modems",
                            "Digital Subscriber Line (DSL)",
                            "Cable TV for Data Transfer"
                        ]
                    },
                    {
                        name: "Unit 4 : Data Link Layer",
                        topics: [
                            "Error Detection Techniques",
                            "Error Correction Techniques",
                            "Data Link Control",
                            "Framing",
                            "Flow Control",
                            "Stop and Wait ARQ",
                            "Go-Back-N ARQ",
                            "Point to Point Protocol (PPP)",
                            "CSMA/CD Protocol",
                            "Ethernet LAN",
                            "Repeaters",
                            "Hubs",
                            "Switches",
                            "Bridges",
                            "Router",
                            "Gateways"
                        ]
                    },
                    {
                        name: "Unit 5 : Network, Transport & Application Layer",
                        topics: [
                            "Routing",
                            "Routing Algorithms",
                            "Distance Vector Routing",
                            "Link State Routing",
                            "IP Protocol",
                            "IPv4 Addressing",
                            "Subnetting",
                            "Internet Control Protocols",
                            "ICMP",
                            "Transport Services",
                            "Error and Flow Control",
                            "Three-Way Handshake",
                            "TCP Protocol",
                            "UDP Protocol",
                            "DNS Protocol",
                            "Overview of WWW",
                            "HTTP Protocol"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "HTTP/2",
                            "HTTP/3 (QUIC)",
                            "WebSockets",
                            "gRPC",
                            "Wireshark Packet Capture & Analysis",
                            "Postman API Client",
                            "traceroute",
                            "netstat",
                            "curl",
                            "TLS 1.3",
                            "HTTPS Handshakes",
                            "DNS over HTTPS (DoH)"
                        ]
                    }
                ]
            },

            // ── Computer Oriented Numerical Methods ─
            {
                id: "conm",
                name: "Computer Oriented Numerical Methods",
                icon: "🔢",
                units: [
                    {
                        name: "Unit 1 : Computer Arithmetic & Errors",
                        topics: [
                            "Introduction to Computer Arithmetic",
                            "Floating Point Arithmetic",
                            "Floating Point Representation of Numbers",
                            "Sources of Errors",
                            "Non-Associativity of Arithmetic",
                            "Propagated Errors",
                            "Pitfalls in Computation"
                        ]
                    },
                    {
                        name: "Unit 2 : Non-Linear Equations",
                        topics: [
                            "Solution of Non-Linear Equations",
                            "Bisection Method",
                            "Fixed Point Method",
                            "Regula Falsi Method",
                            "Newton's Raphson Method",
                            "Secant Method",
                            "Convergence Criteria of Iterative Methods"
                        ]
                    },
                    {
                        name: "Unit 3 : Linear Equations & Interpolation",
                        topics: [
                            "System of Linear Equations",
                            "Cramer's Rule",
                            "Gauss Elimination Method",
                            "Pivoting Strategies",
                            "Gauss Jordan Method",
                            "Jacobi Iterative Method",
                            "Gauss Seidel Method",
                            "Comparison of Direct and Iterative Methods",
                            "Problem of Interpolation",
                            "Lagrange's Interpolation",
                            "Inverse Interpolation",
                            "Newton's Interpolation Formulae"
                        ]
                    },
                    {
                        name: "Unit 4 : Interpolation & Curve Fitting",
                        topics: [
                            "Interpolation at Equally Spaced Points",
                            "Error of Interpolating Polynomial",
                            "Forward Differences",
                            "Backward Differences",
                            "Newton's Forward Difference Formula",
                            "Newton's Backward Difference Formula",
                            "Fitting Polynomials",
                            "Fitting Other Curves",
                            "Least Square Approximation",
                            "Linear Regression",
                            "Polynomial Regression"
                        ]
                    },
                    {
                        name: "Unit 5 : Numerical Differentiation & Integration",
                        topics: [
                            "Numerical Differentiation",
                            "Differentiation Based on Polynomial Fit",
                            "Numerical Integration",
                            "Simpson's Rule",
                            "Gaussian Quadrature Formula",
                            "Numerical Solution of Differential Equations",
                            "dy/dx = f(x,y) Form",
                            "Euler's Method",
                            "Runge-Kutta Methods"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Python Numerical Implementation",
                            "Writing Algorithms using NumPy",
                            "Writing Algorithms using SciPy",
                            "Matrix Decompositions (LU, SVD, QR)",
                            "Eigenvalues and Eigenvectors in Python"
                        ]
                    }
                ]
            },

            // ── System Analysis & Design ────────────
            {
                id: "sad",
                name: "System Analysis & Design",
                icon: "📋",
                units: [
                    {
                        name: "Unit 1 : System Concepts & Analyst",
                        topics: [
                            "System Definition and Concepts",
                            "Characteristics of Systems",
                            "Types of Systems",
                            "Manual and Automated Systems",
                            "Real-Life Business Sub-Systems",
                            "Production Sub-System",
                            "Marketing Sub-System",
                            "Personnel Sub-System",
                            "Material Sub-System",
                            "Finance Sub-System",
                            "Systems Models",
                            "Types of Models",
                            "System Environment and Boundaries",
                            "Real-Time Systems",
                            "Distributed Systems",
                            "Basic Principles of Successful Systems",
                            "Role and Need of Systems Analyst",
                            "Qualifications of Systems Analyst",
                            "Responsibilities of Systems Analyst",
                            "Systems Analyst as Agent of Change"
                        ]
                    },
                    {
                        name: "Unit 2 : SDLC & Planning",
                        topics: [
                            "System Development Life Cycle (SDLC)",
                            "Analysis Phase",
                            "Design Phase",
                            "Development Phase",
                            "Implementation Phase",
                            "Maintenance Phase",
                            "Principles of Systems Documentation",
                            "Types of Documentation",
                            "Data and Fact Gathering Techniques",
                            "Interviews",
                            "Group Communication",
                            "Presentations",
                            "Site Visits",
                            "Feasibility Study",
                            "Types of Feasibility Reports",
                            "System Selection Plan",
                            "Prototyping",
                            "Cost-Benefit Analysis"
                        ]
                    },
                    {
                        name: "Unit 3 : Systems Design & Modelling",
                        topics: [
                            "Process Modeling",
                            "Logical Design",
                            "Physical Design",
                            "Design Representation",
                            "Systems Flowcharts",
                            "Structured Charts",
                            "Data Flow Diagrams (DFD)",
                            "DFD Conventions and Guidelines",
                            "Entity Relationship Diagrams (ERD)",
                            "Data Modeling",
                            "Program and Process Design",
                            "Designing Distributed Systems",
                            "Input/Output Forms Design",
                            "User Interface Design"
                        ]
                    },
                    {
                        name: "Unit 4 : Modular Design & Implementation",
                        topics: [
                            "Modular Design",
                            "Structured Design",
                            "Module Specifications",
                            "Module Coupling",
                            "Module Cohesion",
                            "Top-Down Design",
                            "Bottom-Up Design",
                            "System Implementation Planning",
                            "Conversion Methods",
                            "System Acceptance Criteria",
                            "System Evaluation and Performance",
                            "Testing and Validation",
                            "Quality Control"
                        ]
                    },
                    {
                        name: "Unit 5 : Audit, Security & OOAD",
                        topics: [
                            "System Audit",
                            "Data and Storage Media Procedures",
                            "Audit Trails",
                            "Types of Threats to Computer Systems",
                            "Control Measures",
                            "Disaster Recovery Planning",
                            "Contingency Planning",
                            "Object Oriented Analysis and Design",
                            "OOAD Life Cycle",
                            "Object Modeling",
                            "Class Diagrams",
                            "Dynamic Modeling",
                            "State Diagrams",
                            "Sequence Diagrams"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Agile Methodologies",
                            "Scrum Ceremonies",
                            "Kanban",
                            "User Stories",
                            "Sprint Planning",
                            "Jira Management",
                            "RESTful API Design Principles",
                            "OpenAPI (Swagger) Documentation"
                        ]
                    }
                ]
            },

            // ── Lab (Sem 4) ─────────────────────────
            {
                id: "lab4",
                name: "Lab: OS (Shell Programming) & CONM",
                icon: "🔬",
                units: [
                    {
                        name: "Shell Programming Lab",
                        topics: [
                            "Linux Shell Script Basics",
                            "Loops in Shell Scripts",
                            "Conditions in Shell Scripts",
                            "File Text Processing",
                            "grep & sed Usage",
                            "awk Scripting"
                        ]
                    },
                    {
                        name: "Numerical Methods Lab",
                        topics: [
                            "Newton Raphson Implementation",
                            "Gauss Elimination Implementation",
                            "Runge-Kutta Method Implementation",
                            "Interpolation Programs",
                            "Numerical Integration Programs"
                        ]
                    }
                ]
            },

            // ── Personality & Leadership ────────────
            {
                id: "pld",
                name: "Personality & Leadership Development",
                icon: "🎯",
                units: [
                    {
                        name: "Unit 1 : Personality Concepts",
                        topics: [
                            "The Concept of Personality",
                            "Dimensions of Personality",
                            "Significance of Personality Development",
                            "Concept of Success and Failure",
                            "Hurdles in Achieving Success"
                        ]
                    },
                    {
                        name: "Unit 2 : Problem Solving & Stress",
                        topics: [
                            "Body Language",
                            "Problem Solving",
                            "Conflict Management",
                            "Stress Management",
                            "Decision Making Skills"
                        ]
                    },
                    {
                        name: "Unit 3 : Leadership Qualities",
                        topics: [
                            "Character Building",
                            "Team Work",
                            "Time Management",
                            "Work Ethics",
                            "Good Manners & Etiquettes"
                        ]
                    },
                    {
                        name: "Unit 4 : Interview & GD Skills",
                        topics: [
                            "Resume Building",
                            "Group Discussion Skills",
                            "Facing HR Interviews",
                            "Facing Technical Interviews",
                            "Psychometric Tests",
                            "Mock Interviews"
                        ]
                    },
                    {
                        name: "Unit 5 : Attitude & Motivation",
                        topics: [
                            "Factors Affecting Attitudes",
                            "Developing Positive Attitude",
                            "Internal vs External Motives",
                            "Overcoming Demotivation"
                        ]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: [
                            "Whiteboard Coding Problem Solving",
                            "Explaining Algorithmic Complexity Clearly",
                            "STAR Methodology for Behavioral Questions",
                            "Answering Leadership Questions",
                            "Answering Conflict Resolution Questions"
                        ]
                    }
                ]
            }

        ]
    }

    ,
    // ════════════════════════════════════════
    //  IMCA — Semester 5
    // ════════════════════════════════════════
    "IMCA_5": {
        semester: "IMCA Semester 5",
        subjects: [
            {
                id: "python",
                name: "Python Programming",
                icon: "🐍",
                units: [
                    {
                        name: "Unit 1 : Introduction to Python",
                        topics: ["Introduction to Python", "Python variables", "Python basic Operators", "Understanding python blocks", "Python Data Types", "Declaring Numeric data types", "int", "float"]
                    },
                    {
                        name: "Unit 2 : Program Flow Control",
                        topics: ["Conditional blocks", "if", "else", "elif", "Simple for loops", "For loop using ranges", "string", "list", "dictionaries", "Use of while loops", "Loop manipulation", "pass", "continue", "break", "else", "Programming conditional and loop blocks"]
                    },
                    {
                        name: "Unit 3 : Complex data types & Functions",
                        topics: ["Using string data type", "string operations", "Defining list", "list slicing", "Use of Tuple data type", "String, List and Dictionary Manipulations", "Building blocks of python programs", "in-built functions", "Python Functions", "Organizing python codes using functions"]
                    },
                    {
                        name: "Unit 4 : File Operations",
                        topics: ["Python File Operations", "Reading files", "Writing files in python", "Understanding read functions", "read()", "readline()", "readlines()", "Write functions", "write()", "writelines()", "Manipulating file pointer using seek"]
                    },
                    {
                        name: "Unit 5 : Packages & GUI",
                        topics: ["Python packages", "built-in functions of packages", "matplotlib", "numpy", "pandas", "GUI Programming", "Tkinter introduction", "Tkinter widgets", "Tkinter examples", "Python programming with IDE"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Advanced Language Features", "Generators", "List/Dict comprehensions", "Decorators", "*args and **kwargs", "Context Managers", "Virtual environments (venv, conda)", "pip", "Poetry packaging", "Developing RESTful services", "FastAPI", "Flask"]
                    }
                ]
            },
            {
                id: "ds",
                name: "Data Science",
                icon: "📊",
                units: [
                    {
                        name: "Unit 1 : Machine learning pipeline",
                        topics: ["Machine learning pipeline", "Data acquisition", "Data cleaning", "handling missing data", "data wrangling"]
                    },
                    {
                        name: "Unit 2 : EDA & Feature engineering",
                        topics: ["Exploratory data analysis (EDA)", "visualization", "feature engineering", "modeling", "interpretation", "presentation", "real-world datasets"]
                    },
                    {
                        name: "Unit 3 : Fundamental considerations",
                        topics: ["Fundamental considerations for data analysis", "Bias-variance tradeoff", "training", "validation", "testing"]
                    },
                    {
                        name: "Unit 4 : Classical models",
                        topics: ["Classical models and techniques", "Classification", "regression", "linear regression", "logistic regression", "regularization", "support vector machines (SVM)", "decision trees", "random forests", "XGBoost"]
                    },
                    {
                        name: "Unit 5 : Python ecosystem",
                        topics: ["Python data science ecosystem", "Practical usage", "Scikit-learn", "Pandas", "Matplotlib"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Advanced Exploratory Tools", "Seaborn", "Plotly interactive graphing", "Polars library for large datasets", "Target Encoding", "Power transforms", "Handling imbalanced datasets (SMOTE)", "ROC-AUC curves", "Precision-Recall curves", "F1-Score", "Confusion matrices"]
                    }
                ]
            },
            {
                id: "android",
                name: "Android Mobile Application Development",
                icon: "📱",
                units: [
                    {
                        name: "Unit 1 : Introduction",
                        topics: ["Introduction to Android", "The Android Platform", "Android SDK", "Installation", "Building your First Android application", "Anatomy of Android Application", "Android Manifest file"]
                    },
                    {
                        name: "Unit 2 : Application Design Essentials",
                        topics: ["Android Application Design Essentials", "Application Context", "Activities", "Services", "Intents", "Receiving and Broadcasting Intents", "Android Manifest File and settings", "Using Intent Filter", "Permissions"]
                    },
                    {
                        name: "Unit 3 : UI Design Essentials",
                        topics: ["Android User Interface Design Essentials", "User Interface Screen elements", "Designing User Interfaces with Layouts", "Drawing and Working with Animation"]
                    },
                    {
                        name: "Unit 4 : Testing & Publishing",
                        topics: ["Testing Android applications", "Publishing Android application", "Using Android preferences", "Managing Application resources in a hierarchy", "working with different types of resources"]
                    },
                    {
                        name: "Unit 5 : Common APIs",
                        topics: ["Using Common Android APIs", "Data and Storage APIs", "Managing data using SQLite", "Sharing Data between Applications", "Content Providers", "Android Networking APIs", "Web APIs", "Telephony APIs", "Deploying Android Applications"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Kotlin language basics", "Kotlin Coroutines for asynchronous tasks", "Jetpack Compose development", "Android MVVM Architecture", "Room DB", "Retrofit2 for REST APIs"]
                    }
                ]
            },
            {
                id: "cloud",
                name: "Cloud Computing / Pervasive Computing",
                icon: "☁️",
                units: [
                    {
                        name: "Unit 1 : Cloud Fundamentals",
                        topics: ["Cloud Computing Fundamentals", "Definition", "Types of cloud", "Cloud services", "Benefits and challenges", "Evolution", "usage scenarios", "Business models", "Major Players", "Eucalyptus", "Nimbus", "Open Nebula", "CloudSim"]
                    },
                    {
                        name: "Unit 2 : Cloud Services",
                        topics: ["Types of Cloud services", "SaaS", "PaaS", "IaaS", "DaaS", "Monitoring as a Service", "Communication as services", "Service providers", "Google App Engine", "Amazon EC2", "Microsoft Azure", "Salesforce", "MapReduce", "GFS", "HDFS", "Hadoop Framework"]
                    },
                    {
                        name: "Unit 3 : Collaboration Tools",
                        topics: ["Collaborating on Calendars", "Schedules and Task Management", "Contact Management", "Project Management", "Word Processing", "Databases", "Storing and Sharing Files", "Web-Based Communication Tools"]
                    },
                    {
                        name: "Unit 4 : Virtualization",
                        topics: ["Need for Virtualization", "Pros and cons", "Types of Virtualization", "System VM", "Process VM", "Virtual machine monitor", "Hypervisors", "Xen", "KVM", "VMWare", "Virtual Box", "Hyper-V"]
                    },
                    {
                        name: "Unit 5 : Security in Clouds",
                        topics: ["Security in Clouds", "Cloud security challenges", "SaaS Security", "Standards", "Open Cloud Consortium", "Distributed Management Task Force", "End user access", "Mobile Internet devices and the cloud"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Hands-on AWS Core Services", "EC2", "S3 bucket", "RDS", "IAM roles and policies", "Docker containerization basics", "Kubernetes cluster fundamentals", "Serverless functions (AWS Lambda)", "Infrastructure as Code (IaC)", "Terraform basics"]
                    }
                ]
            },
            {
                id: "lab5",
                name: "Lab: Python & Android",
                icon: "🔬",
                units: [
                    {
                        name: "Python Programming Lab",
                        topics: ["Data analysis scripts", "Pandas", "NumPy", "Scikit-Learn"]
                    },
                    {
                        name: "Android App Development Lab",
                        topics: ["Activity lifecycles", "Intent data passing", "UI layouts", "local database storage"]
                    }
                ]
            },
            {
                id: "values",
                name: "Mulya Pravah",
                icon: "🌿",
                units: [
                    {
                        name: "Core Curriculum",
                        topics: ["Universal human values", "Professional ethics", "Integrity", "Gender equality", "Social responsibility"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Ethics in Artificial Intelligence", "Algorithmic bias", "User privacy laws", "GDPR", "Indian DPDP Act"]
                    }
                ]
            }
        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 6
    // ════════════════════════════════════════
    "IMCA_6": {
        semester: "IMCA Semester 6",
        subjects: [
            {
                id: "cg",
                name: "Computer Graphics",
                icon: "🎨",
                units: [
                    {
                        name: "Unit 1 : Graphics Systems",
                        topics: ["Introduction to Graphics systems", "Basic elements of Computer graphics", "Applications of computer graphics", "Graphics Hardware", "Architecture of Raster and Random scan display devices", "input/output devices"]
                    },
                    {
                        name: "Unit 2 : Fundamental Techniques",
                        topics: ["Fundamental Techniques in Graphics", "Raster scan line", "circle and ellipse drawing", "thick primitives", "Polygon filling"]
                    },
                    {
                        name: "Unit 3 : Geometric Transformations",
                        topics: ["2D and 3D Geometric Transformations", "Translations", "rotation", "scaling", "shearing", "reflection", "composite transformation"]
                    },
                    {
                        name: "Unit 4 : Projections & Surface rendering",
                        topics: ["Projections", "Vanishing points", "Geometric Modeling", "Representing curves & Surfaces", "Visible Surface determination", "Hidden surface elimination", "Surface rendering", "Illumination and shading models"]
                    },
                    {
                        name: "Unit 5 : Color models & Animation",
                        topics: ["Basic color models", "Computer Animation", "case study of a popular graphics software"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["WebGL and Three.js", "interactive 3D in modern web browsers", "Programmable Shaders", "Vertex and Fragment Shaders using GLSL", "Game Engine Architecture", "Unity / Unreal Engine scene hierarchies", "coordinate rendering systems"]
                    }
                ]
            },
            {
                id: "java",
                name: "JAVA Programming",
                icon: "☕",
                units: [
                    {
                        name: "Unit 1 : Overview of Java",
                        topics: ["An overview of Java", "JVM", "byte code", "Java class libraries", "Data types", "Variable", "Data types and casting", "Operators", "operator precedence", "Control statements"]
                    },
                    {
                        name: "Unit 2 : Object Oriented Concepts",
                        topics: ["Declaring object reference variable", "Introducing methods", "constructors", "the this keyword", "garbage collection", "Overloading methods", "String handling", "String buffer"]
                    },
                    {
                        name: "Unit 3 : Inheritance & Packages",
                        topics: ["Inheritance and polymorphism", "super class and subclass", "protected members", "Inheritance hierarchy", "abstract classes and methods", "final methods and classes", "nested classes", "Packages and Interfaces", "Defining a package", "importing package", "defining an interface", "implementing interfaces"]
                    },
                    {
                        name: "Unit 4 : Exceptions & Multithreading",
                        topics: ["Exception Handling", "Fundamentals", "exception types", "using try and catch", "File handling", "Character based file and binary file", "Multithreaded Programming", "Creating a single and multiple threads", "thread priorities", "synchronization"]
                    },
                    {
                        name: "Unit 5 : Applets & GUI",
                        topics: ["Applets", "Applets basics", "applets architecture", "applets skeleton", "the html applet tag", "passing parameters in applets", "event-handling", "event classes and event listener interfaces", "introduction to swing and servlets"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Modern Java (Java 8 to 21)", "Streams API", "Lambda Expressions", "Functional Interfaces", "Optional class", "Build Automation", "Apache Maven", "Gradle configurations", "Dependency resolution", "Spring Boot essentials", "Controllers", "Dependency Injection", "REST endpoints", "Testing Frameworks", "JUnit 5", "Mockito"]
                    }
                ]
            },
            {
                id: "ai",
                name: "Artificial Intelligence",
                icon: "🤖",
                units: [
                    {
                        name: "Unit 1 : Introduction",
                        topics: ["Introduction to Artificial Intelligence", "Background and Applications", "Turing Test", "Rational Agent approaches to AI", "Intelligent Agents", "structure, behavior and environment"]
                    },
                    {
                        name: "Unit 2 : Problem Solving & Search",
                        topics: ["Problem Solving and Searching Techniques", "Problem Characteristics", "Production Systems", "Control Strategies", "BFS", "DFS", "Hill climbing and Variations", "Heuristics Search", "Best First Search", "A* algorithm", "Constraint Satisfaction Problem", "Means-End Analysis", "Game Playing", "Min-Max algorithm", "Alpha-Beta pruning"]
                    },
                    {
                        name: "Unit 3 : Knowledge Representation",
                        topics: ["Knowledge Representation", "First Order Predicate Logic", "Resolution Principle", "Unification", "Semantic Nets", "Conceptual Dependencies", "Frames", "Scripts", "Production Rules", "Conceptual Graphs"]
                    },
                    {
                        name: "Unit 4 : Logic Programming & Uncertainty",
                        topics: ["Programming in Logic (PROLOG)", "Dealing with Uncertainty", "Truth Maintenance System", "Default Reasoning", "Probabilistic Reasoning", "Bayesian Probabilistic Inference"]
                    },
                    {
                        name: "Unit 5 : Natural Language Processing",
                        topics: ["Understanding Natural Languages", "Parsing Techniques", "Context-Free Grammars", "Transformational Grammars", "Recursive Transition Nets", "Augmented Transition Nets"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Neural Foundations", "Multi-Layer Perceptrons", "PyTorch basics for classification", "Modern Heuristic Approaches", "Genetic search", "Monte Carlo Tree Search (MCTS)", "NLP Advancements", "tokenizers", "embedding vectors"]
                    }
                ]
            },
            {
                id: "bigdata",
                name: "Big Data Analytics / Cyber Security",
                icon: "📈",
                units: [
                    {
                        name: "Unit 1 : Introduction",
                        topics: ["Types of Digital Data", "Big Data Analytics", "Apache Hadoop", "Hadoop Streaming", "Hadoop Ecosystem", "IBM Big Data Strategy", "Cybercrime Definition", "Classifications: E-Mail Spoofing, Spamming, Defamation", "Salami Attack, Data Diddling, Web Jacking"]
                    },
                    {
                        name: "Unit 2 : Core Technologies",
                        topics: ["HDFS: Design, CLI, Interfaces, Data flow", "Flume, Sqoop", "Hadoop I/O, Compression, Serialization, Avro", "Cyber Offenses: Reconnaissance", "Active/Passive Attacks", "Cloud Computing Cybercrime"]
                    },
                    {
                        name: "Unit 3 : Processing & Security",
                        topics: ["MapReduce Anatomy", "Failures, Job Scheduling", "Shuffle and Sort, Task Execution", "Mobile & Wireless Devices Vulnerabilities", "Credit card fraud", "mobile security policies"]
                    },
                    {
                        name: "Unit 4 : Ecosystem & Tools",
                        topics: ["Apache Pig", "Apache Hive", "HBase architecture", "Proxy Servers", "Phishing, Password Cracking", "Keyloggers, Spyware, Trojan Horses", "Wireless Attacks"]
                    },
                    {
                        name: "Unit 5 : Analytics & Cyber Laws",
                        topics: ["Data Analytics with Python", "Supervised and Unsupervised Learning", "Collaborative Filtering", "Indian IT Act 2000 and 2008 amendments", "Electronic records admissibility", "challenges in India"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Apache Spark & PySpark", "DataFrame API, Spark SQL", "Apache Kafka for distributed streaming", "OWASP Top 10 vulnerabilities", "SQL Injection, XSS, CSRF", "hands-on network assessment tools", "Burp Suite, Nmap"]
                    }
                ]
            },
            {
                id: "lab6",
                name: "Lab: Graphics & Java",
                icon: "🔬",
                units: [
                    {
                        name: "Computer Graphics Lab",
                        topics: ["Graphics algorithms implementations", "Line algorithm", "Circle algorithm", "2D transformations"]
                    },
                    {
                        name: "JAVA Programming Lab",
                        topics: ["Core Java applications", "OOP design", "multithreading", "custom exceptions", "Swing GUI"]
                    }
                ]
            },
            {
                id: "cogsci",
                name: "Cognitive Science",
                icon: "🧠",
                units: [
                    {
                        name: "Unit 1 : Emergence",
                        topics: ["Emergence of cognitive science", "Behaviorism critique", "Theory of computation", "Linguistics", "Information processing models"]
                    },
                    {
                        name: "Unit 2 : Integration",
                        topics: ["The integration challenge", "Interdisciplinary levels of explanation"]
                    },
                    {
                        name: "Unit 3 : Representation",
                        topics: ["Physical symbol systems", "Language of thought", "Neural networks", "distributed information processing"]
                    },
                    {
                        name: "Unit 4 : Organization of mind",
                        topics: ["Organization of mind", "Brain mapping strategies", "Theory of mind", "False belief", "Simulation"]
                    },
                    {
                        name: "Unit 5 : Cognitive processes",
                        topics: ["Cognitive processes", "Visual perception", "Attention", "Learning", "Memory", "cognitive maps"]
                    },
                    {
                        name: "Extra : Industry Topics",
                        topics: ["Human-Computer Interaction (HCI)", "Usability heuristics", "cognitive ergonomics in UI/UX design"]
                    }
                ]
            }
        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 7
    // ════════════════════════════════════════
    "IMCA_7": {
        semester: "IMCA Semester 7",
        subjects: [
            {
                id: "ins",
                name: "Information and Network Security System",
                icon: "🔒",
                units: [
                    {
                        name: "Unit 1 : Basic Security Concepts",
                        topics: ["Basic Security Concept", "Computer Security", "Threats to Security", "attacks", "Security services & Mechanisms", "Communication Security-Encryption", "Classical Encryption Model", "Steganography"]
                    },
                    {
                        name: "Unit 2 : Cryptography",
                        topics: ["Cryptography- transposition/ substitution", "Caesar Cipher", "Cryptosystem", "Symmetric and Asymmetric crypto primitives", "Private Key Cryptography", "Block Cipher Principles", "Data encryption Standards", "Encryption and Decryption using round functions", "AES", "Triple DES", "Random number generation", "Key distribution"]
                    },
                    {
                        name: "Unit 3 : Authentication & Hashes",
                        topics: ["Message Authentication", "hash functions-message digest", "strong and weak collision", "message authentication code", "MD5", "Hash functions", "Secure Hash algorithm (SHA)", "Birthday paradox", "digital signature", "Digital signature standards (DSS)"]
                    },
                    {
                        name: "Unit 4 : Public Key Cryptography",
                        topics: ["Public Key Cryptography", "Number Theory", "Euclidean algorithm", "Euler Theorem", "Fermat theorem", "Totent function", "multiplicative and additive inverse", "Principles of Public key cryptography", "Public Key infrastructure (PKI)", "RSA algorithm", "Key management", "Elliptic Curve cryptography", "Diffie Hellman Key Exchange"]
                    },
                    {
                        name: "Unit 5 : Network and System Security",
                        topics: ["Network and System Security", "Network Attacks", "IP Security (IP Sec): AH & ESP", "Web security: SSL /TLS", "Kerberos", "E-mail Security: Pretty good Privacy (PGP), S/Mime", "Network scanning", "System security", "intruders", "viruses", "firewall Design Principles", "Intrusion Detection system ( IDS)", "Concept of Cyber Security"]
                    }
                ]
            },
            {
                id: "advjava",
                name: "Advanced JAVA Programming",
                icon: "🚀",
                units: [
                    {
                        name: "Unit 1 : Collections & I/O",
                        topics: ["Utility Methods for Arrays", "Observable and Observer Objects", "Date & Times", "Using Scanner Regular Expression", "Input/ Output Operation in Java", "Streams and I/O Capabilities", "Standard Streams", "Working with File Object", "File I/O Basics", "Reading and Writing to Files", "Buffer Management", "Read/Write Operations with File Channel", "Serializing Objects"]
                    },
                    {
                        name: "Unit 2 : GUI & Collections Framework",
                        topics: ["GUI Programming", "Designing Graphical User Interfaces", "Components and Containers", "Layout Managers", "AWT Components", "Swing Components", "Java Utilities", "The Collection Framework", "Collections of Objects", "Collection Types", "Sets", "Sequence", "Map", "Understanding Hashing", "Use of Array List & Vector"]
                    },
                    {
                        name: "Unit 3 : Event Handling",
                        topics: ["Event Handling", "Event-Driven Programming", "Event- Handling Process", "Event Handling Mechanism", "Delegation Model", "Event Classes", "Event Sources", "Event Listeners", "Adapter Classes"]
                    },
                    {
                        name: "Unit 4 : Database Programming",
                        topics: ["Database Programming using JDBC", "Introduction to JDBC", "JDBC Drivers & Architecture", "CURD operation Using JDBC", "Connecting to non-conventional Databases"]
                    },
                    {
                        name: "Unit 5 : Java Server Technologies",
                        topics: ["Java Server Technologies", "Servlet Web Application Basics", "Architecture and challenges", "Introduction to servlet", "Servlet life cycle", "Developing and Deploying Servlets", "Exploring Deployment", "Descriptor (web.xml)", "Handling Request and Response"]
                    }
                ]
            },
            {
                id: "toc",
                name: "Theory of Computation",
                icon: "🧮",
                units: [
                    {
                        name: "Unit 1 : Introduction & Automata",
                        topics: ["Basic Concepts: Symbols, Strings, Language, Formal Language, Natural Language", "Basic Machine and Finite State Machine", "Finite Automata Definition and Construction", "Deterministic Finite Automata", "Non Deterministic Finite Automat", "NFA with Epsilon-Moves", "Equivalence of NFA and DFA", "Minimization of Finite Automata", "Generalized non-deterministic finite automata"]
                    },
                    {
                        name: "Unit 2 : Regular Expressions",
                        topics: ["Regular Expressions", "Regular Grammar and Languages", "Finite Automata and Regular Grammar Inter-conversion", "Left Linear and Right Linear Grammar", "Closure Properties of Regular Languages", "Non-regular languages and Pumping Lemma"]
                    },
                    {
                        name: "Unit 3 : Context Free Grammar",
                        topics: ["Context Free Grammar and Languages", "Parse tree, derivation, ambiguity", "Ambiguous Grammar and Removal of Ambiguity", "Simplification of Grammar", "Normal Forms of Grammar: Chomsky normal form and GNF", "Non-Context Free Languages", "pumping lemma"]
                    },
                    {
                        name: "Unit 4 : Pushdown Automata",
                        topics: ["Pushdown Automata Definition and Construction", "Deterministic pushdown automata (DPDA)", "Non-Deterministic pushdown automata (NPDA)", "Relation with CFGs", "Equivalence of PDAs and CFGs", "Closure Properties of CFLs"]
                    },
                    {
                        name: "Unit 5 : Turing Machines",
                        topics: ["Turing Machines & Decidability", "Languages of TM", "Types of TM", "Time Complexity of TM", "Halting Problem", "Decidability/ undecidability"]
                    }
                ]
            },
            {
                id: "daa",
                name: "Design and Analysis of Algorithms",
                icon: "⏱️",
                units: [
                    {
                        name: "Unit 1 : Algorithms Analysis",
                        topics: ["Algorithms and structured programming", "analyzing algorithms", "asymptotic behavior of an algorithm", "Order notations", "time and space complexities", "polynomial, logarithmic and exponential", "average and worst case analysis", "lower and upper bounds"]
                    },
                    {
                        name: "Unit 2 : Advanced Data Structures",
                        topics: ["Threaded trees", "B-trees", "Heaps and heapsort", "sets and relations", "Graphs", "Hashing", "Basic search & Traversal Techniques", "Breadth first and Depth first traversals of Graphs"]
                    },
                    {
                        name: "Unit 3 : Algorithm Design Strategies",
                        topics: ["Divide and conquer", "Mergesort", "Quicksort", "matrix multiplication", "Greedy method", "knapsack problem", "job sequencing with deadlines", "minimum cost spanning trees", "Dynamic programming", "0/1 knapsack", "travelling salesman problem"]
                    },
                    {
                        name: "Unit 4 : Backtracking",
                        topics: ["Backtracking", "8 - Queens problem", "Sum of Subsets", "Graph coloring", "0/1 Knapsack", "Branch & Bound 0/1 knapsack", "Travelling salesman"]
                    },
                    {
                        name: "Unit 5 : Approximation Algorithms",
                        topics: ["Approximation algorithms", "Polynomial Time Approximation Schemes", "Complexity", "NP-Hard and NP-complete", "Cook's theorem", "NP completeness reductions"]
                    }
                ]
            },
            {
                id: "lab7",
                name: "Lab: Advanced JAVA & DAA",
                icon: "🔬",
                units: [
                    {
                        name: "Advanced JAVA Programming",
                        topics: ["JDBC Programs", "Servlet applications", "GUI building"]
                    },
                    {
                        name: "Design and Analysis of Algorithms",
                        topics: ["Algorithm implementation", "Sorting techniques", "Graph algorithms", "Dynamic programming solutions"]
                    }
                ]
            }
        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 8
    // ════════════════════════════════════════
    "IMCA_8": {
        semester: "IMCA Semester 8",
        subjects: [
            {
                id: "ml",
                name: "Machine Learning",
                icon: "🤖",
                units: [
                    {
                        name: "Unit 1 : Introduction",
                        topics: ["Machine Learning Introduction", "Types of machine learning", "supervised learning-Basics", "Over fitting the training data", "Nearest Neighbor Methods", "Validation", "K-nearest neighbor methods", "Weighted neighbor methods", "curse of dimensionality", "density estimation"]
                    },
                    {
                        name: "Unit 2 : Probability & Linear Classifiers",
                        topics: ["Probability, Matrix, Random variable", "Conditional probability, Bayes’ theorem", "Over fitting", "linear classification", "Characterizing a linear classifier", "Training a linear classifier"]
                    },
                    {
                        name: "Unit 3 : SVM & Regression",
                        topics: ["Logistic regression", "Support vector machines (SVMs)", "Linear SVM", "Lagrangian optimization and duality", "The soft margin SVM", "The kernel Trick"]
                    },
                    {
                        name: "Unit 4 : Decision Trees",
                        topics: ["Decision Trees: Predictor form", "Training Decision trees", "Decision tree classifiers", "Learning Decision trees"]
                    },
                    {
                        name: "Unit 5 : Clustering",
                        topics: ["Clustering", "K-means", "Agglomerative", "Gaussian Mixtures", "EM algorithm"]
                    }
                ]
            },
            {
                id: "aos",
                name: "Advance Operating System",
                icon: "⚙️",
                units: [
                    {
                        name: "Unit 1 : Resource Manager",
                        topics: ["Operating system as resource Manager", "processor management", "memory management", "file management", "Device management", "operating system services", "operating system classifications", "Processor management", "process states", "multiprogramming", "levels of schedulers", "scheduling algorithms", "multi-processor scheduling", "deadlock prevention, avoidance, detection and recovery"]
                    },
                    {
                        name: "Unit 2 : Memory & File Management",
                        topics: ["Memory management", "Partition, paging and segmentation", "memory management schemes", "virtual memory-demand paging", "procedure sharing", "run time storage allocation", "File Management", "file supports", "access methods", "allocation methods", "directory systems", "file protection", "layered file system"]
                    },
                    {
                        name: "Unit 3 : Resource Protection",
                        topics: ["Resource Protection", "Mechanism, policy and domain of protection", "access matrix and its implementation", "dynamic protection structure"]
                    },
                    {
                        name: "Unit 4 : Device Management",
                        topics: ["Device Management", "Dedicated, shared and virtual devices", "sequential access and direct access devices", "channel and control units", "I/O buffering", "I/O schedulers", "spooling system"]
                    },
                    {
                        name: "Unit 5 : Concurrent Process",
                        topics: ["Concurrent Process and Programming", "Precedence graph", "Bernstein condition", "process hierarchy", "process synchronization", "critical section and mutual exclusion", "classical process co-ordination problems", "critical region", "monitors", "concurrent languages"]
                    }
                ]
            },
            {
                id: "se",
                name: "Software Engineering",
                icon: "📐",
                units: [
                    {
                        name: "Unit 1 : Concepts & Planning",
                        topics: ["Software engineering concepts", "historical perspective", "software evaluation", "program design paradigms", "Software project planning", "identifying software scope", "resources"]
                    },
                    {
                        name: "Unit 2 : Analysis & Estimation",
                        topics: ["Analysis concept", "analysis modeling", "behavioral model, data model, and functional model", "analysis tools & techniques", "risk management", "project scheduling", "tracking", "Cost estimation", "project metrics", "cost factors", "cost estimation techniques"]
                    },
                    {
                        name: "Unit 3 : System Design",
                        topics: ["System design", "Design concepts & principles", "modularization abstraction", "refinement, cohesion, coupling", "design methods", "structured design", "object oriented design", "real time system design", "Implementation", "modern programming language features", "language classes", "coding style", "efficiency"]
                    },
                    {
                        name: "Unit 4 : SQA & Testing",
                        topics: ["Software Quality Assurance", "Quality factors and criteria", "SQA metrics, SQA techniques", "Verification and Validation", "software testing methods (WBT, BBT)", "software testing strategy", "Unit testing, integration testing, validation system, testing"]
                    },
                    {
                        name: "Unit 5 : Maintenance",
                        topics: ["Maintenance", "Maintenance characteristics", "Maintainability", "software reuse", "re-engineering", "reverse engineering", "CASE tools"]
                    }
                ]
            },
            {
                id: "advai",
                name: "Advanced Artificial Intelligence",
                icon: "🧠",
                units: [
                    {
                        name: "Unit 1 : AI Overview",
                        topics: ["General Issues and Overview of AI", "The AI problems", "AI technique", "Problem Solving", "Search and Control Strategies", "Forward and backward chaining", "Exhaustive searches: Depth and Breadth first search"]
                    },
                    {
                        name: "Unit 2 : Heuristic Search",
                        topics: ["Heuristic Search Techniques", "Hill climbing", "Branch and Bound technique", "Best first search & A* algorithm", "AND/ OR graphs", "problem reduction & AO* algorithm", "constraint satisfaction problems", "means ends analysis", "Knowledge Representation"]
                    },
                    {
                        name: "Unit 3 : AI Programming",
                        topics: ["AI Programming Language: PROLOG", "Introduction", "Clauses: Facts, goals and rules", "Prolog unification mechanism", "arithmetic operator", "list manipulations", "Fail and Cut predicates recursion"]
                    },
                    {
                        name: "Unit 4 : Planning & Uncertainty",
                        topics: ["Planning Overview", "Example Domain: The block word", "component of planning systems", "goal stack planning", "non-linear planning using goal sets", "Handling Uncertainty", "Probability theory", "Bayes theorem and Bayesian networks", "Certainty factor", "Fuzzy Logic"]
                    },
                    {
                        name: "Unit 5 : NLP & Expert Systems",
                        topics: ["Natural Language Processing", "Parsing techniques", "context-free grammar", "Case and Logic grammars", "Semantic Analysis", "Expert Systems", "knowledge acquisition", "case studies: MYCIN"]
                    }
                ]
            },
            {
                id: "lab8",
                name: "Lab: .NET, OS & Seminar",
                icon: "🔬",
                units: [
                    {
                        name: ".NET & OS Lab",
                        topics: [".NET Programming", "Operating System simulation"]
                    },
                    {
                        name: "Seminar",
                        topics: ["Article Submission", "Presentation", "Viva-Voce"]
                    }
                ]
            }
        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 9
    // ════════════════════════════════════════
    "IMCA_9": {
        semester: "IMCA Semester 9",
        subjects: [
            {
                id: "ms",
                name: "Modeling & Simulation",
                icon: "📊",
                units: [
                    {
                        name: "Unit 1 : System Concepts",
                        topics: ["Definition of System", "Types of system-continuous and discrete", "modelling process and definition of a model"]
                    },
                    {
                        name: "Unit 2 : Modeling Models",
                        topics: ["Computer work load and preparation of its models", "verification and validation modelling procedures", "comparing model data with real system", "Differential and partial differential equation models"]
                    },
                    {
                        name: "Unit 3 : Simulation Process",
                        topics: ["Simulation Process", "Use of simulation", "advantages and disadvantages of simulation", "discrete and continuous simulation procedures", "Discrete system simulation: Monte Carlo method", "Random Number Generation"]
                    },
                    {
                        name: "Unit 4 : Evaluation & PERT",
                        topics: ["Evaluation of simulation", "length of simulation runs", "variance reduction techniques", "Project management : PERT/CPM techniques", "simulation of PERT networks", "Model as components of information systems", "modelling for decision support"]
                    },
                    {
                        name: "Unit 5 : Simulation Languages",
                        topics: ["Simulation languages", "discrete and continuous simulation language", "Simula", "Dyanamo", "Stella", "Powerism", "Their application and Comparison"]
                    }
                ]
            },
            {
                id: "soft",
                name: "Soft Computing",
                icon: "🧠",
                units: [
                    {
                        name: "Unit 1 : Introduction",
                        topics: ["What is Soft Computing?", "Difference between Hard and Soft computing", "Requirement of Soft computing", "Major Areas of Soft Computing", "Applications of Soft Computing"]
                    },
                    {
                        name: "Unit 2 : Neural Networks",
                        topics: ["Neural Network", "Learning rules and activation functions", "Single layer Perceptrons", "Back Propagation networks", "Architecture of Back-propagation(BP) Networks", "Back-propagation Learning", "Associative Memory", "Adaptive Resonance theory", "Self Organizing Map"]
                    },
                    {
                        name: "Unit 3 : Fuzzy Set Theory",
                        topics: ["Fuzzy Set theory", "Fuzzy versus Crisp set", "Fuzzy Relation", "Fuzzification", "Minmax Composition", "Defuzzification Method", "Fuzzy Logic", "Fuzzy Rule based systems", "Predicate logic", "Fuzzy Decision Making", "Fuzzy Control Systems", "Fuzzy Classification"]
                    },
                    {
                        name: "Unit 4 : Genetic Algorithms",
                        topics: ["History of Genetic Algorithms (GA)", "Working Principle", "Various Encoding methods", "Fitness function", "GA Operators- Reproduction, Crossover, Mutation", "Convergence of GA", "Bit wise operation in GA", "Multi-level Optimization"]
                    },
                    {
                        name: "Unit 5 : Evolutionary Computing",
                        topics: ["Evolutionary Computing", "Simulated Annealing", "Random Search", "Downhill Simplex Search"]
                    }
                ]
            },
            {
                id: "minor",
                name: "Minor Project",
                icon: "🚀",
                units: [
                    {
                        name: "Project Work",
                        topics: ["Software Development", "Documentation", "Presentation"]
                    }
                ]
            },
            {
                id: "elec1",
                name: "Elective (Wireless/Vision/Embedded)",
                icon: "📡",
                units: [
                    {
                        name: "Topics Covered",
                        topics: ["Wireless Technology", "Image Analysis & Computer Vision", "Real Time System", "Embedded System Design", "Software Project Management"]
                    }
                ]
            },
            {
                id: "elec2",
                name: "Elective (NLP/Parallel/Compiler/IOT)",
                icon: "🔌",
                units: [
                    {
                        name: "Topics Covered",
                        topics: ["Natural Language Processing", "Parallel Processing", "Compiler Design", "Artificial Neural Network", "Internet of Things(IOT)"]
                    }
                ]
            }
        ]
    },

    // ════════════════════════════════════════
    //  IMCA — Semester 10
    // ════════════════════════════════════════
    "IMCA_10": {
        semester: "IMCA Semester 10",
        subjects: [
            {
                id: "major",
                name: "Major Project (Industrial Training)",
                icon: "🏢",
                units: [
                    {
                        name: "Project Work",
                        topics: ["SRS (Document + Presentation)", "SDS (Document + Presentation)", "Mid-term demo of Project", "Mid-term Project Report", "Project Report", "Executable Code / Execution of Project", "Final Presentation of the Project", "Viva-Voce"]
                    }
                ]
            }
        ]
    }


};

// ── Helper: get syllabus for a given profile ──────────────
// profile = { branch: "IMCA", semester: "1", backSubjects: [...] }
export function getSyllabus(profile) {
    if (!profile) return null;
    const key = `${profile.branch}_${profile.semester}`;
    let baseSyllabus = allSyllabi[key];
    
    if (!baseSyllabus) {
        // Fallback to default if semester syllabus doesn't exist yet
        baseSyllabus = allSyllabi["IMCA_2"]; 
    }

    const syllabus = JSON.parse(JSON.stringify(baseSyllabus));

    if (profile.backSubjects && Array.isArray(profile.backSubjects)) {
        profile.backSubjects.forEach(bs => {
            const bsKey = `${bs.branch}_${bs.semester}`;
            const bsSyllabus = allSyllabi[bsKey];
            if (bsSyllabus) {
                const subjectToBack = bsSyllabus.subjects.find(s => s.id === bs.subjectId);
                if (subjectToBack) {
                    const clonedSub = JSON.parse(JSON.stringify(subjectToBack));
                    clonedSub.name = `${clonedSub.name} (Back)`;
                    syllabus.subjects.push(clonedSub);
                }
            }
        });
    }

    return syllabus;
}

export function getAvailableBackSubjects(profile) {
    if (!profile) return [];
    
    const currentSem = parseInt(profile.semester);
    if (isNaN(currentSem)) return [];
    
    const isOdd = currentSem % 2 !== 0;
    const available = [];
    
    // Strict university rule: Odd in Odd, Even in Even.
    for (let i = 1; i < currentSem; i++) {
        const isPastOdd = i % 2 !== 0;
        if (isOdd === isPastOdd) {
            const key = `${profile.branch}_${i}`;
            const pastSyllabus = allSyllabi[key];
            if (pastSyllabus) {
                pastSyllabus.subjects.forEach(sub => {
                    available.push({
                        branch: profile.branch,
                        semester: i.toString(),
                        subjectId: sub.id,
                        name: sub.name,
                        icon: sub.icon
                    });
                });
            }
        }
    }
    
    // --- FALLBACK FOR TESTING ---
    // If you are in Sem 1 or 2, the strict rule means you have NO back subjects.
    // To allow you to test the feature right now, we will relax the rule if the list is empty,
    // and just show you subjects from Sem 1 and 2 (excluding your current sem).
    if (available.length === 0) {
        Object.keys(allSyllabi).forEach(key => {
            const semNum = parseInt(key.split("_")[1]);
            // Exclude current semester
            if (semNum !== currentSem) {
                allSyllabi[key].subjects.forEach(sub => {
                    available.push({
                        branch: profile.branch,
                        semester: semNum.toString(),
                        subjectId: sub.id,
                        name: sub.name,
                        icon: sub.icon
                    });
                });
            }
        });
    }
    
    return available;
}

// ── Backward-compat default (IMCA Sem 2) ─────────────────
export const syllabus = allSyllabi["IMCA_2"];