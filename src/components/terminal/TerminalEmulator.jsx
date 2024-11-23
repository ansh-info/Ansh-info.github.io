import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import PropTypes from "prop-types";

const TerminalEmulator = ({ isMobile = false, isOpen, setIsOpen }) => {
  const [lines, setLines] = useState([""]);
  const [currentLine, setCurrentLine] = useState(0);
  const [mode, setMode] = useState("normal");
  const [cursor, setCursor] = useState(0);
  const terminalRef = useRef(null);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history] = useState([
    "vim portfolio.md",
    "git status",
    "git add .",
    'git commit -m "feat: add new skills"',
    "npm run dev",
    "ls",
    "cd projects",
  ]);

  // Define available commands
  const commands = {
    ls: () => "Documents  Downloads  portfolio  node_modules  package.json",
    pwd: () => "/home/ansh/projects/portfolio",
    whoami: () => "ansh",
    date: () => new Date().toLocaleString(),
    "git status": () =>
      "On branch main\nYour branch is up to date with 'origin/main'",
    clear: () => {
      setLines([""]);
      setCurrentLine(0);
      return "";
    },
    help: () => `Available commands:
  ls          - List directory contents
  pwd         - Print working directory
  whoami      - Display current user
  date        - Show current date/time
  git status  - Show git status
  clear       - Clear terminal
  vim         - Open vim editor
  cd          - Change directory
  help        - Show this help message`,
    cd: (args) => `Changed directory to ${args || "~"}`,
    cat: (args) =>
      args ? `Displaying contents of ${args}` : "Please specify a file",
    echo: (args) => args || "",
  };

  useEffect(() => {
    if (isOpen) {
      terminalRef.current?.focus();
    }
  }, [isOpen]);

  const handleCommand = (input) => {
    const [cmd, ...args] = input.trim().split(" ");

    if (commands[cmd]) {
      return commands[cmd](args.join(" "));
    }

    if (cmd.startsWith("vim")) {
      setMode("vim");
      return `Opening ${input.split(" ")[1] || "untitled"} in vim...
[Vim Mode]
Press 'i' for insert mode
Press 'Esc' for normal mode
Note: This is a simulated vim environment`;
    }

    if (cmd.startsWith("git")) {
      return `Simulating git command: ${input}
Successfully executed ${cmd}`;
    }

    if (cmd.trim() === "") return "";

    return `Command not found: ${cmd}
Type 'help' for available commands`;
  };

  const handleKeyDown = (e) => {
    // Enter key handling
    if (e.key === "Enter") {
      const output = handleCommand(lines[currentLine]);
      if (output) {
        setLines([...lines, output, ""]);
      } else {
        setLines([...lines, ""]);
      }
      setCurrentLine(lines.length);
      setCursor(0);
      setHistoryIndex(-1);
      e.preventDefault();
      return;
    }

    // Mode switching
    if (e.key === "Escape") {
      setMode("normal");
      return;
    }

    if (e.key === "i" && mode === "normal") {
      setMode("insert");
      return;
    }

    // History navigation
    if (e.key === "ArrowUp") {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const newLines = [...lines];
        newLines[currentLine] = history[history.length - 1 - newIndex];
        setLines(newLines);
        setCursor(history[history.length - 1 - newIndex].length);
      }
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const newLines = [...lines];
        newLines[currentLine] = history[history.length - 1 - newIndex];
        setLines(newLines);
        setCursor(history[history.length - 1 - newIndex].length);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        const newLines = [...lines];
        newLines[currentLine] = "";
        setLines(newLines);
        setCursor(0);
      }
      e.preventDefault();
      return;
    }

    // Cursor movement
    if (mode === "normal") {
      if (e.key === "h") setCursor(Math.max(0, cursor - 1));
      if (e.key === "l")
        setCursor(Math.min(lines[currentLine].length, cursor + 1));
      if (e.key === "0") setCursor(0);
      if (e.key === "$") setCursor(lines[currentLine].length);
      return;
    }

    // Text input
    if (mode === "insert" && !e.ctrlKey && !e.altKey && e.key.length === 1) {
      const newLines = [...lines];
      const line = newLines[currentLine];
      newLines[currentLine] =
        line.slice(0, cursor) + e.key + line.slice(cursor);
      setLines(newLines);
      setCursor(cursor + 1);
      return;
    }

    // Backspace handling
    if (e.key === "Backspace" && mode === "insert") {
      if (cursor > 0) {
        const newLines = [...lines];
        const line = newLines[currentLine];
        newLines[currentLine] = line.slice(0, cursor - 1) + line.slice(cursor);
        setLines(newLines);
        setCursor(cursor - 1);
      }
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed ${
        isMobile
          ? "inset-0 bg-gray-900/95 z-50"
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[min(900px,85vw)] h-[min(600px,80vh)] z-40"
      } bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-5 h-5 text-green-400" />
          <h2 className="text-sm font-semibold text-white">Terminal</h2>
          <span className="text-xs text-gray-400 px-2 py-1 bg-gray-700 rounded">
            {mode.toUpperCase()} MODE
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex-1 font-mono bg-gray-900 p-4 text-green-400 overflow-y-auto focus:outline-none min-h-0"
      >
        <div className="mb-2 text-gray-400">
          Welcome to Terminal! Type &apos;help&apos; for available commands.
          Press &apos;i&apos; for insert mode, &apos;Esc&apos; for normal mode.
        </div>

        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-blue-400 mr-2">$</span>
            <span>
              {i === currentLine ? (
                <>
                  {line.slice(0, cursor)}
                  <span className="bg-green-400 text-black">
                    {line[cursor] || " "}
                  </span>
                  {line.slice(cursor + 1)}
                </>
              ) : (
                line
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

TerminalEmulator.propTypes = {
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default TerminalEmulator;

