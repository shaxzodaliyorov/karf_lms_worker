import { Phone, User, Heart, CalendarIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";

type EmergencyContactFormValues = {
  relationship: string;
  phone: string;
  fullName: string;
  dob: string;
  dateOfBirth: Date | null;
};

export const EmergencyContact = () => {
  const { t } = useTranslation("emergency");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    // dateOfBirth: null,
  } = useForm<EmergencyContactFormValues>();

  const onSubmit: SubmitHandler<EmergencyContactFormValues> = (data) => {
    console.log({
      ...data,
      dob: data.dob ? format(new Date(data.dob), "yyyy-MM-dd") : null,
    });
    setIsDialogOpen(false);
  };
  const emergencyContact = {
    relationship: "Mother",
    phoneNumber: "+998 90 123 45 67",
    fullName: "Sarah Johnson",
    dateOfBirth: "25/08/1965",
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Heart className="h-5 w-5 text-red-500" />
              {t("details.title")}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PiDotsThreeOutlineVerticalFill />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="mr-4">
                <DropdownMenuGroup>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <TbEdit size={16} />
                        <span className="ml-2">Edit</span>
                      </DropdownMenuItem>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[550px] p-8">
                      <DialogHeader>
                        <DialogTitle>
                          Edit {t("details.title")}
                        </DialogTitle>
                      </DialogHeader>

                      <form
                        className="grid gap-3"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="grid gap-3">
                          <Label htmlFor="relationship">{t("details.relationship")}</Label>
                          <Controller
                            name="relationship"
                            control={control}
                            rules={{ required: "Relationship is required" }}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger
                                  className={`w-full ${
                                    errors.relationship ? "border-red-500" : ""
                                  }`}
                                >
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="mother">
                                      Mother
                                    </SelectItem>
                                    <SelectItem value="father">
                                      Father
                                    </SelectItem>
                                    <SelectItem value="sister">
                                      Sister
                                    </SelectItem>
                                    <SelectItem value="brother">
                                      Brother
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.relationship && (
                            <p className="text-sm text-red-600">
                              {errors.relationship.message}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="phone">{t("details.phoneNumber")}</Label>
                          <Input
                            id="phone"
                            {...register("phone", {
                              required: "Phone is required",
                            })}
                            placeholder="+998 90 123 45 67"
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-600">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="fullName">{t("details.fullName")}</Label>
                          <Input
                            id="fullName"
                            {...register("fullName", {
                              required: "Full name is required",
                            })}
                            placeholder="Sarah Johnson"
                            className={errors.fullName ? "border-red-500" : ""}
                          />
                          {errors.fullName && (
                            <p className="text-sm text-red-600">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>

                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <div className="flex flex-col gap-3">
                            <Label htmlFor="dateOfBirth" className="px-1">
                              {t("details.dateOfBirth")}
                            </Label>

                            <Controller
                              name="dateOfBirth"
                              control={control}
                              rules={{ required: "Date of birth is required" }}
                              render={({ field }) => (
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      id="dateOfBirth"
                                      className={`w-full justify-between font-normal ${
                                        errors.dateOfBirth
                                          ? "border-red-500"
                                          : ""
                                      }`}
                                    >
                                      {field.value
                                        ? field.value.toLocaleDateString()
                                        : "Select date"}
                                      <CalendarIcon
                                        color="gray"
                                        className="w-4 h-4 ml-2"
                                      />{" "}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value || undefined}
                                      onSelect={(date) => {
                                        field.onChange(date);
                                        setOpen(false);
                                      }}
                                      captionLayout="dropdown"
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />

                            {errors.dateOfBirth && (
                              <span className="text-red-500 text-sm px-1">
                                {errors.dateOfBirth.message}
                              </span>
                            )}
                          </div>
                        </form>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-600"
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  {t("details.relationship")}
                </p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {emergencyContact.relationship}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  {t("details.phoneNumber")}
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-500" />
                  <p className="text-base text-gray-900 font-medium">
                    <a
                      href={`tel:${emergencyContact.phoneNumber}`}
                      className="text-green-600 hover:text-green-800 hover:underline"
                    >
                      {emergencyContact.phoneNumber}
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{t("details.fullName")}</p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <p className="text-base text-gray-900 font-medium">
                    {emergencyContact.fullName}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  {t("details.dateOfBirth")}
                </p>
                <div className="flex items-center gap-2">
                  {/* <Calendar className="h-4 w-4 text-blue-500" /> */}
                  <p className="text-base text-gray-900">
                    {emergencyContact.dateOfBirth}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border-2 border-red-100 bg-red-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900">
                    {t("danger.title")}
                  </h3>
                  <p className="text-sm text-red-700">
                    {t("danger.description")}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">
                    {t("danger.name")}:
                  </span>
                  <span className="text-sm text-red-900 font-semibold">
                    {emergencyContact.fullName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">
                    {t("details.relationship")}:
                  </span>
                  <span className="text-sm text-red-900">
                    {emergencyContact.relationship}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">
                    {t("danger.phoneNumber")}:
                  </span>
                  <a
                    href={`tel:${emergencyContact.phoneNumber}`}
                    className="text-sm text-red-900 font-semibold hover:underline"
                  >
                    {emergencyContact.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
