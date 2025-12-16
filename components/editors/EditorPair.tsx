import CodeEditor from './CodeEditor';

interface EditorPairProps {
  originalCode: string;
  updateCode: string;
  onOriginalChange: (code: string) => void;
  onUpdateChange: (code: string) => void;
  onCopyOriginal: () => void;
  onCopyUpdate: () => void;
}

export default function EditorPair({
  originalCode,
  updateCode,
  onOriginalChange,
  onUpdateChange,
  onCopyOriginal,
  onCopyUpdate,
}: EditorPairProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <CodeEditor
        value={originalCode}
        onChange={onOriginalChange}
        label="Original Code"
        placeholder="Paste your original code here..."
        required
        onCopy={onCopyOriginal}
      />
      <CodeEditor
        value={updateCode}
        onChange={onUpdateChange}
        label="Update Code"
        placeholder="Paste the AI-generated update code here..."
        required
        onCopy={onCopyUpdate}
      />
    </div>
  );
}
