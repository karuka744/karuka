import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/orders";

type OrderPayload = {
  name: string;
  city: string;
  phone: string;
  message?: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, city, phone, quantity, unitPrice, total } = body ?? {};
  if (
    !name?.trim() ||
    !city?.trim() ||
    !phone?.trim() ||
    !Number.isFinite(quantity) ||
    !Number.isFinite(unitPrice) ||
    !Number.isFinite(total) ||
    quantity < 1
  ) {
    return NextResponse.json(
      { error: "البيانات ناقصة أو غير صالحة." },
      { status: 400 }
    );
  }

  if (total !== quantity * unitPrice) {
    return NextResponse.json({ error: "الإجمالي لا يطابق الكمية." }, { status: 400 });
  }

  try {
    const order = await saveOrder({
      name: name.trim(),
      city: city.trim(),
      phone: phone.trim(),
      message: (body.message ?? "").trim(),
      quantity,
      unitPrice,
      total,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (err) {
    console.error("[order] save failed:", err);
    return NextResponse.json(
      { error: "تعذّر حفظ الطلب الآن." },
      { status: 500 }
    );
  }
}
