import { Calendar, Pin, Download, AlertCircle } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

interface NoticeCardProps {
  notice: {
    _id: string;
    title: string;
    publishedDate: string;
    expiryDate?: string;
    content: string;
    priority?: string;
    category?: string;
    pinned?: boolean;
    attachments?: Array<{
      asset: {
        url: string;
        originalFilename?: string;
      };
      description?: string;
    }>;
    targetAudience?: string[];
  };
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  const publishedDate = new Date(notice.publishedDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const expiryDate = notice.expiryDate
    ? new Date(notice.expiryDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : null;

  const getPriorityStyles = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
        return "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20";
      case "high":
        return "border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20";
      default:
        return "border-l-4 border-l-primary/30";
    }
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 ${getPriorityStyles(
        notice.priority
      )}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {notice.pinned && (
              <Pin className="w-4 h-4 text-primary fill-primary" />
            )}
            <h3 className="font-orpheus font-bold text-lg text-primary line-clamp-2">
              {notice.title}
            </h3>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-proximaNova">{publishedDate}</span>
            </div>

            {expiryDate && (
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="font-proximaNova">Expires: {expiryDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col items-end gap-2">
          {notice.priority && (
            <CategoryBadge category={notice.priority} size="sm" />
          )}
          {notice.category && (
            <CategoryBadge category={notice.category} size="sm" />
          )}
        </div>
      </div>

      {/* Content */}
      <p className="font-proximaNova text-sm text-foreground/80 mb-4 whitespace-pre-line line-clamp-4">
        {notice.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/50">
        {/* Target Audience */}
        {notice.targetAudience && notice.targetAudience.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-proximaNova text-foreground/50">For:</span>
            <div className="flex gap-1.5">
              {notice.targetAudience.map((audience) => (
                <span
                  key={audience}
                  className="text-xs font-proximaNova px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {notice.attachments && notice.attachments.length > 0 && (
          <div className="flex items-center gap-2">
            {notice.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.asset.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/20 text-primary hover:bg-secondary hover:text-primary font-proximaNova font-semibold text-xs rounded-md transition-colors"
                title={attachment.description || attachment.asset.originalFilename}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Attachment {index + 1}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
