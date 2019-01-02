export interface IProps {}

export interface IContainerProps extends IProps {
  navigation: any;
}

export type contactPoint = Readonly<{
  id: string;
  name: string;
  description: string;
  imagePath: string;
  createDate: number;
  modifyData: number;
}>;
