export enum OrderStatus {
  Processing = 'Processing',
  Canceled = 'Canceled',
  Delivered = 'Delivered',
}

export interface OrderProps {
  id: number | null;
  userId: number;
  status: OrderStatus;
  shippingCarrier: string | null;
  shippingTrackingNumber: string | null;
}

export class Order implements OrderProps {
  private props: OrderProps;

  get id(): number | null {
    return this.props.id;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  set status(status: OrderStatus) {
    this.props.status = status;
  }

  get shippingCarrier(): string | null {
    return this.props.shippingCarrier;
  }

  set shippingCarrier(shippingCarrier: string | null) {
    this.props.shippingCarrier = shippingCarrier;
  }

  get shippingTrackingNumber(): string | null {
    return this.props.shippingTrackingNumber;
  }

  set shippingTrackingNumber(shippingTrackingNumber: string | null) {
    this.props.shippingTrackingNumber = shippingTrackingNumber;
  }

  get userId(): number {
    return this.props.userId;
  }

  constructor(props: OrderProps) {
    this.props = props;
  }

  public toDb(): any {
    const { userId, status, shippingCarrier, shippingTrackingNumber } =
      this.props;

    return {
      userId,
      status,
      shippingCarrier,
      shippingTrackingNumber,
    };
  }

  public static toDomain(props: any): Order | null {
    if (props === null || props === undefined) {
      return null;
    }

    const {
      id,
      userId,
      status,
      shippingCarrier = null,
      shippingTrackingNumber = null,
    } = props;

    return new Order({
      id: Number(id),
      userId: Number(userId),
      status: OrderStatus[status],
      shippingCarrier,
      shippingTrackingNumber,
    });
  }
}
