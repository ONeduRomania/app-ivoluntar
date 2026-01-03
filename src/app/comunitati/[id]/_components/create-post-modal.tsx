"use client";

import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import { Post } from "./community-feed";
import Image from "next/image";
import { useOrganization } from "@/contexts/organization-context";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  onPostCreated?: (post: Omit<Post, "id" | "createdAt" | "likes" | "comments">) => void;
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) {
  const { currentOrganization } = useOrganization();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postType, setPostType] = useState<"post" | "poll">("post");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = [...images, ...files].slice(0, 5); // Max 5 imagini
      setImages(newImages);

      // Creează preview-uri
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (postType === "poll") {
      const validOptions = pollOptions.filter((opt) => opt.trim());
      if (validOptions.length < 2) {
        alert("Un sondaj trebuie să aibă cel puțin 2 opțiuni");
        return;
      }
    } else {
      if (!content.trim() && images.length === 0) {
        alert("Postarea trebuie să conțină text sau imagini");
        return;
      }
    }

    // TODO: Upload imagini la backend și obține URL-uri
    const imageUrls = imagePreviews; // Pentru moment folosim preview-urile

    // TODO: Trimite postarea la backend pentru moderare
    onPostCreated?.({
      author: {
        name: "Utilizator Curent", // TODO: Înlocuiește cu datele reale
        avatar: "/images/user/user-03.png",
        organization: currentOrganization.name,
        userId: "current-user-id", // TODO: Din context/auth
      },
      content: postType === "poll" ? content.trim() : (content.trim() || ""),
      image: imageUrls.length > 0 ? imageUrls[0] : undefined,
      type: postType,
      status: "pending", // Postarea este trimisă spre moderare
      pollOptions:
        postType === "poll"
          ? pollOptions
              .filter((opt) => opt.trim())
              .map((opt, idx) => ({
                id: idx.toString(),
                text: opt.trim(),
                votes: 0,
              }))
          : undefined,
    });

    // Reset form
    setContent("");
    setImages([]);
    setImagePreviews([]);
    setPostType("post");
    setPollOptions(["", ""]);
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Creează o postare
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selector tip postare */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPostType("post")}
              className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                postType === "post"
                  ? "border-primary bg-primary text-white"
                  : "border-stroke bg-white text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              }`}
            >
              Postare
            </button>
            <button
              type="button"
              onClick={() => setPostType("poll")}
              className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                postType === "poll"
                  ? "border-primary bg-primary text-white"
                  : "border-stroke bg-white text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              }`}
            >
              Sondaj
            </button>
          </div>

          {postType === "post" ? (
            <>
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  placeholder="Ce vrei să spui?"
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>

              {/* Upload imagini */}
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                  Imagini (opțional, max 5)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border-2 border-dashed border-stroke px-4 py-3 text-sm text-dark-4 transition-colors hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                >
                  + Adaugă imagini
                </button>

                {/* Preview imagini */}
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={200}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-1 top-1 rounded-full bg-red-light p-1 text-white"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12 4L4 12M4 4l8 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                  Întrebare pentru sondaj *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  placeholder="Pune o întrebare..."
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Opțiuni (minim 2, maxim 6) *
                </label>
                <div className="space-y-2">
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updatePollOption(index, e.target.value)}
                        placeholder={`Opțiunea ${index + 1}`}
                        className="flex-1 rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                        required={index < 2}
                      />
                      {pollOptions.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removePollOption(index)}
                          className="rounded-lg border border-red-light px-3 py-2 text-sm text-red-light transition-colors hover:bg-red-light hover:text-white"
                        >
                          Șterge
                        </button>
                      )}
                    </div>
                  ))}
                  {pollOptions.length < 6 && (
                    <button
                      type="button"
                      onClick={addPollOption}
                      className="w-full rounded-lg border-2 border-dashed border-stroke px-4 py-2 text-sm text-dark-4 transition-colors hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                    >
                      + Adaugă opțiune
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
            >
              Anulează
            </button>
            <button
              type="submit"
              disabled={
                postType === "poll"
                  ? !content.trim() ||
                    pollOptions.filter((opt) => opt.trim()).length < 2
                  : !content.trim() && images.length === 0
              }
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {postType === "poll" ? "Creează sondaj" : "Postează"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

