import React, { useState, useEffect, useMemo } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const KenBurnsImagesPanel: React.FC<{
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ images, setImages }) => {
  // ✅ loaders only new state
  const [uploadingSlots, setUploadingSlots] = useState<Record<number, boolean>>(
    {}
  );
  const [folderUploading, setFolderUploading] = useState(false);

  // ✅ always ensure length 5
  useEffect(() => {
    if (images.length < 5) {
      setImages((prev) => [...prev, ...Array(5 - prev.length).fill("")]);
    } else if (images.length > 5) {
      setImages((prev) => prev.slice(0, 5));
    }
  }, [images, setImages]);

  // ✅ DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ✅ stable slot IDs
  const slotIds = useMemo(
    () => Array.from({ length: 5 }, (_, i) => `slot-${i}`),
    []
  );

  // ✅ single upload
  const handleSingleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSlots((prev) => ({ ...prev, [index]: true }));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/uploadhandler/upload-kenburns-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        const newImages = [...images];
        newImages[index] = data.url;
        setImages(newImages);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } finally {
      setUploadingSlots((prev) => ({ ...prev, [index]: false }));
      (e.target as HTMLInputElement).value = "";
    }
  };

  // ✅ remove
  const handleRemove = (index: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  };

  // ✅ folder upload
  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setFolderUploading(true);

    const formData = new FormData();
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await fetch("/uploadhandler/upload-kenburns-folder", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        const uploaded = data.images.map((img: { url: string }) => img.url);
        setImages([...uploaded, ...Array(5 - uploaded.length).fill("")]);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } finally {
      setFolderUploading(false);
      (e.target as HTMLInputElement).value = "";
    }
  };

  // ✅ reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slotIds.indexOf(String(active.id));
    const newIndex = slotIds.indexOf(String(over.id));

    if (oldIndex !== -1 && newIndex !== -1) {
      setImages((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div
      style={{
        marginBottom: "1.5rem",
        padding: "1rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(12,24,48,0.06)",
        border: "1px solid #eef2ff",
      }}
    >
      <h3 style={{ marginBottom: 16, color: "#0b63ff" }}>🖼️ KenBurns Images</h3>

      <div
      style={{
        background: "#f5f9ff",
        border: "1px solid #d6e3ff",
        borderRadius: 8,
        padding: "12px 14px",
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 1.5,
        color: "#333",
      }}
    >
      <strong style={{ color: "#0b63ff" }}>How it works:</strong>
      <ul style={{ margin: "8px 0 0 20px", padding: 0 }}>
        <li>Upload a folder of images (up to 5) to auto-fill all slots or upload/replace individual images in the slots below.</li>
        <li>Drag and drop the slots to arrange your preferred order.</li>
        <li>Remove an image anytime to clear its slot.</li>
      </ul>
    </div>

      {/* FOLDER UPLOAD ALWAYS SHOWN ON TOP */}
      <div
        style={{
          border: "2px dashed #cfe0ff",
          borderRadius: 10,
          padding: 16,
          marginBottom: 20,
          textAlign: "center",
          background: "#fbfcff",
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          {...({ webkitdirectory: "" } as any)}
          style={{ display: "none" }}
          id="kb-folder-upload"
          onChange={handleFolderUpload}
        />
        <label
          htmlFor="kb-folder-upload"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            background: "#0b63ff",
            color: "white",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          📂 Upload Folder
        </label>
        <p style={{ fontSize: 13, color: "#555", marginTop: 8 }}>
          Upload up to 5 images from a folder. This will overwrite the slots
          below.
        </p>
        {folderUploading && (
          <div style={{ marginTop: 10 }}>
            <Spinner />
          </div>
        )}
      </div>

      {/* SEPARATE UPLOADS BELOW */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={slotIds} strategy={rectSortingStrategy}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {slotIds.map((slotId, i) => (
              <SortableImage
                key={slotId}
                id={slotId}
                img={images[i] ?? ""}
                index={i}
                uploading={!!uploadingSlots[i]}
                onUpload={handleSingleUpload}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

// Sortable image card
const SortableImage: React.FC<{
  id: string;
  img: string;
  index: number;
  uploading?: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemove: (index: number) => void;
}> = ({ id, img, index, uploading, onUpload, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? "transform 160ms ease",
        position: "relative",
        width: "100%",
        height: 240,
        border: img ? "2px solid #0b63ff" : "2px dashed #c6c9d6",
        borderRadius: 12,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: img
          ? `url(${img})`
          : "linear-gradient(180deg,#fff,#fafafa)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          background: "rgba(255,255,255,0.9)",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
          cursor: "grab",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        <span style={{ opacity: 0.6 }}>⠿</span>
        <span>Image {index + 1}</span>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: 10,
          background: "rgba(255,255,255,0.92)",
          borderTop: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <input
          type="file"
          accept="image/*"
          id={`kb-upload-${index}`}
          style={{ display: "none" }}
          onChange={(e) => onUpload(e, index)}
        />

        {img ? (
          <label
            htmlFor={`kb-upload-${index}`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              padding: "8px 10px",
              background: "#0b63ff",
              color: "white",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Replace
          </label>
        ) : (
          <label
            htmlFor={`kb-upload-${index}`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              padding: "8px 10px",
              background: "#0b63ff",
              color: "white",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Upload
          </label>
        )}

        {img && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              padding: "8px 10px",
              background: "#ff5252",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Remove
          </button>
        )}
      </div>

      {/* slot spinner */}
      {uploading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.7)",
            pointerEvents: "none",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

const Spinner: React.FC = () => (
  <>
    <div
      style={{
        width: 28,
        height: 28,
        border: "3px solid #e6eefc",
        borderTop: "3px solid #0b63ff",
        borderRadius: "50%",
        animation: "kb-spin 0.9s linear infinite",
      }}
    />
    <style>{`
      @keyframes kb-spin { to { transform: rotate(360deg) } }
    `}</style>
  </>
);
