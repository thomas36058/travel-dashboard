"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import { Button } from "./button";

export interface TagsInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  ({ className, value = [], onValueChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");

    const addTag = () => {
      if (inputValue.trim() === "") return;

      const formatted = inputValue
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      if (!value.includes(formatted)) {
        onValueChange?.([...value, formatted]);
      }

      setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      }
    };

    const removeTag = (tag: string) => {
      onValueChange?.(value.filter((t) => t !== tag));
    };

    return (
      <div className="flex items-start gap-2">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm flex-1",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          {value.map((tag) => (
            <TagItem key={tag} onRemove={() => removeTag(tag)}>
              {tag}
            </TagItem>
          ))}

          <input
            ref={ref}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder={props.placeholder ?? "Digite um destino"}
            {...props}
          />
        </div>

        <Button type="button" onClick={addTag} className="shrink-0">
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </Button>
      </div>
    );
  }
);
TagsInput.displayName = "TagsInput";

interface TagItemProps extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
}

const TagItem = React.forwardRef<HTMLDivElement, TagItemProps>(
  ({ className, children, onRemove, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
);
TagItem.displayName = "TagItem";

export { TagsInput, TagItem };
