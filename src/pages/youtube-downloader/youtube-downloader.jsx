import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { youtubeDownload } from "@/api/generalApi";
import { Loader2 } from "lucide-react";

export const YoutubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [loadingMp4, setLoadingMp4] = useState(false);
  const [loadingMp3, setLoadingMp3] = useState(false);
  const [error, setError] = useState("");

  const handleUrlchange = (url) => {
    setUrl(url);
    if (url.includes("youtube") || url.includes("youtu.be"))
      setPlatform("youtube");
    else if (url.includes("tiktok")) setPlatform("tiktok");
    else if (url.includes("facebook")) setPlatform("facebook");
    else if (url.includes("instagram")) setPlatform("instagram");
  };
  const handleDownload = async (format) => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    if (format === "mp4") setLoadingMp4(true);
    if (format === "mp3") setLoadingMp3(true);
    setError("");
    try {
      const response = await youtubeDownload({
        url,
        format,
        quality,
        platform,
      });
      if (response.status === 200) {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `video.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        setError("Failed to download the video.");
      }
    } catch (err) {
      setError("Failed to download the video.");
    } finally {
      if (format === "mp4") setLoadingMp4(false);
      if (format === "mp3") setLoadingMp3(false);
    }
  };
  return (
    <main className="flex-1 content-center  ">
      
      <div className="mx-auto max-w-md space-y-6 py-12 px-5 border rounded 	">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Media Downloader</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Download your favorite social media videos in various formats.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-url">Video URL</Label>
            <Input
              id="video-url"
              placeholder="Paste the YouTube video URL here"
              type="text"
              onChange={(e) => handleUrlchange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-platform">Platform</Label>
            <Select
              id="video-platform"
              value={platform}
              onValueChange={(value) => setPlatform(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-quality">Video Quality</Label>
            <Select
              id="video-quality"
              value={quality}
              onValueChange={(value) => setQuality(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              {platform != "facebook" ? (
                <SelectContent>
                  <SelectItem value="360p">360p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="1440p">1440p</SelectItem>
                  <SelectItem value="2160p">2160p (4K)</SelectItem>
                </SelectContent>
              ) : (
                <SelectContent>
                  <SelectItem value="hd">HD</SelectItem>
                  <SelectItem value="sd">SD</SelectItem>
                </SelectContent>
              )}
            </Select>
          </div>
          {loadingMp4 || loadingMp3 ? (
            <div className="grid">
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => handleDownload("mp4")}>
                {loadingMp4 ? "Downloading..." : "Download MP4"}
              </Button>
              <Button onClick={() => handleDownload("mp3")}>
                {loadingMp3 ? "Downloading..." : "Download MP3"}
              </Button>
            </div>
          )}
          <div>{error && <p className="text-red-500">{error}</p>}</div>
        </div>
      </div>
    </main>
  );
};
