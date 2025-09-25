import path from 'path';
import fs from 'fs';
import { z } from 'zod/v4';

export const tmpDir = path.join(__dirname, '..', '..', '..', 'tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

export const baseUrl = process.env.BASE_URL

interface File {
  file: Buffer;
  filename: string;
  size?: number;
  mimetypes?: string[];
}
export const uploadFile = async ({ file, filename, size, mimetypes }: File) => {
  mimetypes = !mimetypes || mimetypes.length === 0 ? ['.png', '.jpg', '.jpeg'] : mimetypes;

  const fileSchema = z
    .object({
      data: z.custom<Buffer>(v => Buffer.isBuffer(v), { message: 'Esperado Buffer' }),
      filename: z.string().min(1),
    })
    .superRefine((val, ctx) => {
      if (val.data.length > (size ?? 1) * 1024 * 1024) {
        ctx.addIssue({
          code: 'too_big',
          maximum: (size ?? 1) * 1024 * 1024,
          origin: 'array',
          message: `Arquivo maior que ${size ?? 1}MB`,
        });
      }

      if (!mimetypes.includes(path.extname(val.filename).toLowerCase())) {
        ctx.addIssue({
          code: 'custom',
          message: `Apenas ${mimetypes.join(', ')} são permitidos`,
        });
      }
    })
    .transform(({ data, filename }) => {
      return {
        data: data,
        // TODO: Sanitizar o nome do arquivo
        filename: `${Date.now()}-${filename}`,
      };
    });

  const parsed = fileSchema.parse({
    data: file,
    filename,
  });

  const destPath = path.join(tmpDir, parsed.filename);
  await fs.promises.writeFile(destPath, parsed.data);

  return parsed.filename;
};
