
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 100000),
  ]);
  const [selectedRating, setSelectedRating] = useState<number>(
    Number(searchParams.get("minRating") || 0)
  );

  // Apply price filter with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (priceRange[0] === 0 && priceRange[1] === 100000) {
        searchParams.delete("minPrice");
        searchParams.delete("maxPrice");
      } else {
        searchParams.set("minPrice", priceRange[0].toString());
        searchParams.set("maxPrice", priceRange[1].toString());
      }
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange]);

  // Apply rating filter
  useEffect(() => {
    if (selectedRating === 0) {
      searchParams.delete("minRating");
    } else {
      searchParams.set("minRating", selectedRating.toString());
    }
    setSearchParams(searchParams);
  }, [selectedRating]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(selectedRating === rating ? 0 : rating);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Price Range Filter */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-0">
          <AccordionTrigger className="py-2 hover:no-underline font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              <Slider
                value={priceRange}
                min={0}
                max={100000}
                step={1000}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Customer Ratings Filter */}
      <Accordion type="single" collapsible defaultValue="rating">
        <AccordionItem value="rating" className="border-0">
          <AccordionTrigger className="py-2 hover:no-underline font-medium">
            Customer Ratings
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating === rating}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 flex items-center cursor-pointer text-sm"
                  >
                    {rating}
                    <Star
                      size={14}
                      className="ml-1 text-amber-400 fill-amber-400"
                    />{" "}
                    & above
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Availability Filter */}
      <Accordion type="single" collapsible>
        <AccordionItem value="availability" className="border-0">
          <AccordionTrigger className="py-2 hover:no-underline font-medium">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center">
                <Checkbox id="in-stock" />
                <label
                  htmlFor="in-stock"
                  className="ml-2 cursor-pointer text-sm"
                >
                  In Stock
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox id="include-oos" />
                <label
                  htmlFor="include-oos"
                  className="ml-2 cursor-pointer text-sm"
                >
                  Include Out of Stock
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Discount Filter */}
      <Accordion type="single" collapsible>
        <AccordionItem value="discount" className="border-0">
          <AccordionTrigger className="py-2 hover:no-underline font-medium">
            Discount
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {["10% or more", "25% or more", "50% or more", "60% or more"].map(
                (discount) => (
                  <div key={discount} className="flex items-center">
                    <Checkbox id={`discount-${discount}`} />
                    <label
                      htmlFor={`discount-${discount}`}
                      className="ml-2 cursor-pointer text-sm"
                    >
                      {discount}
                    </label>
                  </div>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
