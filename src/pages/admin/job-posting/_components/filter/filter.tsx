/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, RefreshCcw, Save } from "lucide-react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Modal } from "@/common/modal";
import type { FilterProps } from "./types";
import { Button } from "@/common";

const formSchema = z
  .object({
    recruitmentNumber: z.string().min(1, "Recruitment number is required"),
    recruitmentCountry: z.string().min(1, "Recruitment country is required"),
    recruitmentSkill: z.string().min(1, "Recruitment skill is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    numberOfCompanies: z.string().min(1, "Number of companies is required"),
    applicationRate: z.string().min(1, "Application rate is required"),
    applicantsPerCompany: z
      .string()
      .min(1, "Applicants per company is required"),
    firstEvaluation: z.string().min(1, "First evaluation is required"),
    secondEvaluation: z.string().min(1, "Second evaluation is required"),
    foreignWorkerMatching: z
      .string()
      .min(1, "Foreign worker matching is required"),
    expectedEntry: z.string().min(1, "Expected entry is required"),
    additionalNotes: z.string().optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type FormData = z.infer<typeof formSchema>;

const countries = [
  "Thailand",
  "Vietnam",
  "Philippines",
  "Indonesia",
  "Myanmar",
  "Cambodia",
  "Laos",
];

const skills = ["판금", "용접", "도장", "조립", "기타"];

const companyNumbers = ["10", "20", "30", "40", "50"];
const applicationRates = Array.from(
  { length: 10 },
  (_, i) => `${(i + 1) * 10}%`
);
const applicantNumbers = Array.from({ length: 10 }, (_, i) => `${i + 1}명`);
const scheduleOptions = Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10}`);

const leftTableData = [
  { no: 1, region: "서울", rate: "7%", selected: 4 },
  { no: 2, region: "광주", rate: "4%", selected: 2 },
  { no: 3, region: "울산", rate: "3%", selected: 1 },
  { no: 4, region: "경기", rate: "28%", selected: 14 },
  { no: 5, region: "충북", rate: "4%", selected: 2 },
  { no: 6, region: "전북", rate: "5%", selected: 2 },
  { no: 7, region: "부산", rate: "5%", selected: 3 },
  { no: 8, region: "대구", rate: "4%", selected: 2 },
];

const rightTableData = [
  { no: 9, region: "인천", rate: "6%", selected: 3 },
  { no: 10, region: "대전", rate: "3%", selected: 1 },
  { no: 11, region: "강원", rate: "4%", selected: 2 },
  { no: 12, region: "충남(세종)", rate: "6%", selected: 3 },
  { no: 13, region: "전남", rate: "5%", selected: 3 },
  { no: 14, region: "경북", rate: "6%", selected: 3 },
  { no: 15, region: "경남", rate: "8%", selected: 4 },
  { no: 16, region: "제주", rate: "1%", selected: 1 },
];

export const FilterModal = ({ onClose, open }: FilterProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recruitmentNumber: "",
      recruitmentCountry: "Thailand",
      recruitmentSkill: "",
      numberOfCompanies: "50",
      applicationRate: "20%",
      applicantsPerCompany: "1명",
      firstEvaluation: "50",
      secondEvaluation: "60",
      foreignWorkerMatching: "100",
      expectedEntry: "50",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form data:", data);

      form.reset();
      // toast({
      //   title: "Form saved ✅",
      //   description: "Recruitment plan has been successfully saved.",
      // });
    } catch (error: any) {
      // toast({
      //   title: "Error",
      //   description: "Failed to save form. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onReset = () => {
    form.reset();
    // toast({
    //   title: "Form reset",
    //   description: "All fields have been cleared.",
    // });
  };

  return (
    <Modal
      variant="xl"
      className="w-full"
      onOpenChange={onClose}
      open={open}
      title="Foreign Worker Recruitment Plan"
      description="Complete the recruitment plan details belows"
    >
      <div className="max-h-[660px] overflow-y-auto h-full ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="recruitmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recruitment Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="제 1기 외국인 근로자 모집공고(태국_50_판금)"
                        className="h-10 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recruitmentCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recruitment Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recruitmentSkill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recruitment Skill</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skills.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Period</Label>
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "h-10 w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Start date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="text-muted-foreground">–</span>
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "h-10 w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>End date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="numberOfCompanies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Companies Recruiting</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companyNumbers.map((num) => (
                          <SelectItem key={num} value={num}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Rate per Company</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select rate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {applicationRates.map((rate) => (
                          <SelectItem key={rate} value={rate}>
                            {rate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicantsPerCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicants per Company</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {applicantNumbers.map((num) => (
                          <SelectItem key={num} value={num}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Region Quota Tables */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Region Quota Distribution
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">NO</TableHead>
                      <TableHead>지역</TableHead>
                      <TableHead>비율</TableHead>
                      <TableHead>선발인원</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leftTableData.map((row, index) => (
                      <TableRow
                        key={row.no}
                        className={index % 2 === 1 ? "bg-muted/50" : ""}
                      >
                        <TableCell className="font-medium">{row.no}</TableCell>
                        <TableCell>{row.region}</TableCell>
                        <TableCell>{row.rate}</TableCell>
                        <TableCell>{row.selected}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">NO</TableHead>
                      <TableHead>지역</TableHead>
                      <TableHead>비율</TableHead>
                      <TableHead>선발인원</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rightTableData.map((row, index) => (
                      <TableRow
                        key={row.no}
                        className={index % 2 === 1 ? "bg-muted/50" : ""}
                      >
                        <TableCell className="font-medium">{row.no}</TableCell>
                        <TableCell>{row.region}</TableCell>
                        <TableCell>{row.rate}</TableCell>
                        <TableCell>{row.selected}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Relevant Schedule Expectations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstEvaluation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1st evaluation (video)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {scheduleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              이후~ {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondEvaluation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2nd evaluation (local skills)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {scheduleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              이후~ {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="foreignWorkerMatching"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foreign worker matching</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {scheduleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              이후~ {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedEntry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Expected entry and on-site deployment
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {scheduleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              이후~ {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Other Explanations</h2>
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes..."
                        className="min-h-[120px] w-full resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-2">
              <Button disabled={isSubmitting}>
                <Save size={14} className="mr-2" />
                <span>Save</span>
              </Button>
              <Button
                onClick={onReset}
                type="button"
                variant="outline"
                disabled={isSubmitting}
              >
                <RefreshCcw size={14} className="mr-2" />
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
