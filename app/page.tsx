"use client";

import { calculateFromInput } from "@/actions/calculate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Nut } from "lucide-react";
import { FC } from "react";
import { useServerAction } from "zsa-react";

const Home: FC = () => {
  const { data, isPending, execute } = useServerAction(calculateFromInput);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between flex-col lg:flex">
        <h1 className="font-bold text-5xl mb-4">viaPhoton <Nut className="inline-block h-16 w-16" /></h1>
        <p>A pile of nuts is in an oasis, across a desert from a town. The pile contains 'N' kg of nuts, and
        the town is 'D' kilometers away from the pile.</p>
        <p>The goal of this problem is to write a program that will compute 'X', the maximum amount of nuts that can be
        transported to the town.</p>
        <p>The nuts are transported by a horse drawn cart that is initially next to the pile of nuts. The cart
        can carry at most 'C' kilograms of nuts at any one time. The horse uses the nuts that it is
        carrying as fuel. It consumes 'F' kilograms of nuts per kilometer travelled regardless of how
        much weight it is carrying in the cart. The horse can load and unload the cart without using up
        any nuts.</p>
        <p>Your program should have a function that takes as input 4 real numbers D,N,F,C and returns
        one real number: 'X'</p>
        <p>Your program should also have a function that reads an input text
        from a textarea in a website. This input contains an arbitrary number of lines. Each line is of the
        form: D,N,F,C where D,N,F, C are integers in decimal notation. This function should write to
        web page as many lines as the input file had. Each line
        should contain the input and the result expressed in a single real number X.</p>

        <form className="my-5" onSubmit={async (event) => {
            event.preventDefault()
            const form = event.currentTarget

            const formData = new FormData(form)
            const [, err] = await execute(formData)

            if (err) {
              console.error(err);

              return
            }

            form.reset()
          }}>
          <div className="text-center">
            <Label className="font-bold" htmlFor="input">Input in D,N,F,C format, one per line</Label>
            <Textarea name="input" />
            <Button className="mt-2" disabled={isPending} type="submit">
              {isPending ? "Calculating..." : "Calculate"}
            </Button>
          </div>
        </form>

        {data && <Table>
          <TableCaption>Results</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>D</TableHead>
              <TableHead>N</TableHead>
              <TableHead>F</TableHead>
              <TableHead>C</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={`result-${row.toString()}`}>
                <TableCell>{row[0]}</TableCell>
                <TableCell>{row[1]}</TableCell>
                <TableCell>{row[2]}</TableCell>
                <TableCell>{row[3]}</TableCell>
                <TableCell className="font-semibold">{row[4].toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </div>
    </main>
  );
}

export default Home;
