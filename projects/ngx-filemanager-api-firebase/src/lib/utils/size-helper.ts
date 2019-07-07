import { permHelper } from '../permissions/permissions-helper';
import { paths } from '../utils/paths';
import { Bucket, File } from '../types/google-cloud-types';

export async function GetActualFileSize(file: File): Promise<number> {
  try {
    const [meta] = await file.getMetadata();
    const byteCount = +meta.size;
    return byteCount;
  } catch (error) {
    throw new Error(error);
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function ResolveFileSizeFromMeta(file: File): Promise<number> {
  try {
    const [fileExists] = await file.exists();
    if (!fileExists) {
      await file.save(new Buffer(''));
      await delay(300);
    }
  } catch (error) {
    await file.save(new Buffer(''));
    await delay(300);
  }
  try {
    const size = await permHelper.GetMetaPropertyString(file, 'size_total');
    if (size) {
      return +size;
    }
    const actualSize = await GetActualFileSize(file);
    await SetFileSizeToMeta(file, actualSize);
    return actualSize;
  } catch (error) {
    throw new Error(error);
  }
}

export async function SetFileSizeToMeta(file: File, newSize: number): Promise<void> {
  return permHelper.SetMetaPropertyString(file, 'size_total', newSize + '');
}

export async function AddSizeToParentsRecursively(
  bucket: Bucket,
  file: File,
  initialSize: number
): Promise<void> {
  const filePath = file.name;
  const parentPath = paths.GetParentDir(filePath);
  if (parentPath === '/') {
    return;
  }
  const parentFile = bucket.file(parentPath);
  const parentCurrentSize = await ResolveFileSizeFromMeta(parentFile);
  const totalSize = initialSize + parentCurrentSize;
  await SetFileSizeToMeta(parentFile, totalSize);
  return AddSizeToParentsRecursively(bucket, parentFile, initialSize);
}

export async function AddSizeToParents(
  bucket: Bucket,
  file: File
): Promise<void> {
  try {
    const currentSize = await ResolveFileSizeFromMeta(file);
    await AddSizeToParentsRecursively(bucket, file, currentSize);
  } catch (error) {
    throw new Error(error);
  }
}

export const sizeHelper = {
  GetActualFileSize,
  ResolveFileSizeFromMeta,
  AddSizeToParents
};
