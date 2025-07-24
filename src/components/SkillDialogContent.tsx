import React from "react";
import { Star } from "@phosphor-icons/react";

export function SkillDialogContent({ skill }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">How to practice:</h3>
        <ol className="list-decimal ml-6 space-y-2">
          {Array.isArray(skill?.content) && skill.content.length > 0 ? (
            skill.content.map((step, i) => (
              <li key={i}>{step}</li>
            ))
          ) : (
            <li>No practice steps available for this skill.</li>
          )}
        </ol>
      </div>
      {skill.worksheet && (
        <div className="bg-accent/10 p-4 rounded-lg mt-6">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            Worksheet
          </h3>
          <form className="space-y-4">
            {skill.worksheet.fields.map((field) => (
              <div key={field.id}>
                <label className="block font-medium mb-1">{field.label}</label>
                {field.type === "text" && (
                  <input type="text" className="w-full p-2 border rounded" placeholder={field.placeholder} required={field.required} />
                )}
                {field.type === "textarea" && (
                  <textarea className="w-full p-2 border rounded" placeholder={field.placeholder} required={field.required} />
                )}
                {field.type === "select" && (
                  <select className="w-full p-2 border rounded" required={field.required}>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {field.type === "number" && (
                  <input type="number" className="w-full p-2 border rounded" placeholder={field.placeholder} required={field.required} />
                )}
              </div>
            ))}
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">Submit Worksheet</button>
          </form>
        </div>
      )}
      {skill.training && (
        <div className="bg-accent/10 p-4 rounded-lg mt-6">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            Training Exercise
          </h3>
          <div className="mb-2 font-semibold">{skill.training.title}</div>
          <div className="mb-2 text-muted-foreground">{skill.training.description}</div>
          <div className="mb-2">Duration: {skill.training.duration}</div>
          <ol className="list-decimal ml-6 space-y-1 mb-2">
            {skill.training.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <div className="italic">Reflection: {skill.training.reflection}</div>
        </div>
      )}
    </div>
  );
}
