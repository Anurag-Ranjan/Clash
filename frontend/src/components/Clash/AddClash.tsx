"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios, { AxiosError } from "axios";
import { CREATE_CLASH_URL } from "@/lib/apiEndPoints";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";

function AddClash({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [clashData, setClashData] = useState<ClashFormType>();
  const [date, setDate] = React.useState<Date>();
  const [openPicker, setOpenPicker] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [clashError, setClashError] = useState<ClashFormErrorType>({});

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setClashError({});
      setLoading(true);
      const formData = new FormData();
      formData.append("title", clashData?.title ?? "");
      formData.append("description", clashData?.description ?? "");
      formData.append("expire_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);

      console.log("This is : ", CREATE_CLASH_URL);

      const { data } = await axios.post(CREATE_CLASH_URL, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      setLoading(false);
      if (data) {
        setClashData({});
        setImage(null);
        setDate(undefined);
        toast.success(data?.data?.message ?? "Clash created successfully");
      }
      setTimeout(() => setOpen(false), 500);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 422) {
          setClashError({
            title: error.response?.data?.errors?.title ?? "",
            description: error.response?.data?.errors?.description ?? "",
            expire_at: error.response?.data?.errors?.expire_at ?? "",
            image: error.response?.data?.errors?.image ?? "",
          });
          setLoading(false);
        } else {
          toast.error(error.response?.data?.message ?? "Something went wrong");
          setLoading(false);
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="!p-2 font-medium cursor-pointer">
          Create new Clash
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] !p-5 w-2xl max-h-[500px] overflow-auto custom-scrollbar"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Clash</DialogTitle>
          <DialogDescription className="!mt-2">
            Upload a new clash and let the community decide the best for you
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                value={clashData?.title ?? ""}
                onChange={(e) => {
                  setClashData({ ...clashData, title: e.target.value });
                }}
                className="!p-2"
                id="title"
                type="text"
                name="title"
                placeholder="Enter you title"
              />
              <span className="text-red-600 block">{clashError.title}</span>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={clashData?.description ?? ""}
                onChange={(e) => {
                  setClashData({ ...clashData, description: e.target.value });
                }}
                className="!p-2"
                id="description"
                name="description"
                placeholder="Enter the description"
              ></Textarea>
              <span className="text-red-600 block">
                {clashError.description}
              </span>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                name="image"
                placeholder="Enter you title"
                className="cursor-pointer"
                onChange={handleImageChange}
              />
              <span className="text-red-600 block">{clashError.image}</span>
            </div>
            <div className="grid gap-3">
              <Popover open={openPicker} onOpenChange={setOpenPicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal !p-2 cursor-pointer"
                  >
                    <CalendarIcon />
                    {date ? date.toDateString() : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      setOpenPicker(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <span className="text-red-600 block">{clashError.expire_at}</span>
            </div>
          </div>
          <div className="grid !gap-3 !mt-3">
            <Button
              type="submit"
              className="!p-2 cursor-pointer w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddClash;
