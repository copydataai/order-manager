"use client";

import { useEffect, useState } from "react";
import { Button } from "@order/ui/button";
import { Card, CardContent, CardFooter } from "@order/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@order/ui/carousel";
import { Minus, Plus } from "lucide-react";

export function CarouselProduct({
  productUnits,
  setProductUnits,
  product,
  error,
}) {
  useEffect(() => {}, [productUnits]);
  const [units, setUnits] = useState(0);

  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-xl font-semibold">{product.name}</span>
        </CardContent>
        <CardFooter>
          <Button
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              setUnits(units + 1);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <p>{units}</p>
          <Button
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              if (units === 0) return;
              setUnits(units - 1);
            }}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
