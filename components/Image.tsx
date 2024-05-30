import NextImage, { ImageProps } from 'next/image';

const Image = ({ ...rest }: ImageProps) => <NextImage className="rounded-[12px] shadow-jt4" {...rest} />;

export default Image;
