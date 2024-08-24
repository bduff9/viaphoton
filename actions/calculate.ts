'use server';

import { getMaxNuts } from "@/lib/utils";
import z from "zod";
import { createServerAction } from "zsa";

export const calculateFromInput = createServerAction()
	.input(z.object({ input: z.string() }), { type: 'formData' })
	.handler(async ({ input }) => {
		const lines = input.input.split('\n');

		return lines.map(line => {
			const [D, N, F, C] = line.split(',').map(Number);
			const result = getMaxNuts(D, N, F, C);

			return [D, N, F, C, result];
		});
	});
