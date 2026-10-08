Tic Tac Toe

A browser-based Tic Tac Toe game with single-player and two-player modes.

Live demo: https://suryanavyasree.github.io/Tic-Tac-Toe/

Features
Play against the computer or a friend on the same device
Unbeatable computer opponent using the minimax algorithm
Win and draw detection, with the winning cells highlighted
Live score tracking across rounds
Responsive layout that works on mobile and desktop
Keyboard accessible (tab to a cell and press Enter)
Tech Stack
HTML5 for page structure
CSS3 (Grid, Flexbox, CSS variables) for styling and layout
JavaScript (ES6) for game logic and DOM manipulation
How It Works
The board is stored as an array of 9 items ("X", "O" or empty).
After every move, the game checks 8 possible winning lines (3 rows, 3 columns, 2 diagonals).
The computer uses the minimax algorithm: it simulates every possible future game and picks the move with the best outcome, so it never loses.
Project Structure
tic-tac-toe/
├── index.html   # Page structure
├── style.css    # Styling and layout
└── script.js    # Game logic and computer AI
How to Run
Clone the repository:
   git clone https://github.com/SuryaNavyasree/Tic-Tac-Toe.git
Open index.html in your browser.

No installation or dependencies needed.

Author

Surya Navyasree