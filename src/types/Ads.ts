interface AdsObject extends ObjectIdentify {
  image: string;
  endPointType: number;
  endPointUrl: string;
  endPointId: number;
  popup?: {
    id: number;
    product: any;
  };
}
