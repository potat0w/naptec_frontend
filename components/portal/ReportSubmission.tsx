"use client";

import { generateOrganizedReport } from "@/lib/portal/ai-report";
import { formTextareaClass } from "@/lib/auth/form-styles";
import { Copy, Download, Sparkles } from "lucide-react";
import { useState } from "react";

type ReportSubmissionProps = {
  clientName?: string;
  onGenerated?: (raw: string, organized: string) => void;
};

export default function ReportSubmission({ clientName, onGenerated }: ReportSubmissionProps) {
  const [rawNotes, setRawNotes] = useState("");
  const [organized, setOrganized] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = generateOrganizedReport(rawNotes);
    setOrganized(result);
    setGenerating(false);
    onGenerated?.(rawNotes, result);
  };

  const handleCopy = async () => {
    if (!organized) return;
    await navigator.clipboard.writeText(organized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {clientName ? (
        <p className="text-sm text-muted">
          Submitting report for <span className="font-medium text-neutral-900">{clientName}</span>
        </p>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-body">Raw visit notes</span>
        <textarea
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          rows={5}
          placeholder="e.g. gave medicine at 8am patient ate lunch helped walking blood pressure normal"
          className={formTextareaClass}
        />
      </label>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!rawNotes.trim() || generating}
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" />
        {generating ? "Generating…" : "Generate Organized Report"}
      </button>

      {organized ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-surface-card bg-surface-alt/50 p-4">
            <h3 className="text-sm font-semibold text-neutral-900">Original Notes</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-body">{rawNotes}</p>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-brand">AI Organized Version</h3>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-body">
              {organized}
            </pre>
          </div>
          <div className="flex flex-wrap gap-2 lg:col-span-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body hover:bg-surface-alt"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy report"}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body hover:bg-surface-alt"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
