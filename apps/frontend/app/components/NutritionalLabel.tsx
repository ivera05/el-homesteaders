import { NutritionalInfo } from "@/app/types";

export default function NutritionLabel({ info }: { info: NutritionalInfo }) {
  return (
    <div className="w-full max-w-75 border-2 border-black bg-white p-3 text-black font-sans leading-tight">
      <h2 className="text-3xl font-black border-b-8 border-black pb-1 uppercase tracking-tighter">
        Nutrition Facts
      </h2>
      <div className="border-b border-black py-1 font-bold">
        {info.servingSize || "1 package"} per container
      </div>
      <div className="flex justify-between items-end border-b-8 border-black py-1">
        <span className="font-black text-lg leading-none">
          Amount per serving
        </span>
        {info.calories !== undefined ? (
          <>
            <span className="font-black text-3xl leading-none">Calories</span>
            <span className="font-black text-3xl leading-none">
              {info.calories || "100"}
            </span>
          </>
        ) : null}
      </div>

      {/* Main Nutrient Table */}
      <div className="text-sm">
        {info.fat !== undefined ? (
          <div className="flex justify-between border-b border-black py-1">
            <span>
              <span className="font-bold">Total Fat</span> {info.fat || "0g"}
            </span>
            <span className="font-bold">0%</span>
          </div>
        ) : null}
        {info.carbohydrates !== undefined ? (
          <div className="flex justify-between border-b border-black py-1">
            <span>
              <span className="font-bold">Total Carbohydrate</span>{" "}
              {info.carbohydrates || "0g"}
            </span>
            <span className="font-bold">0%</span>
          </div>
        ) : null}
        {info.sugar !== undefined ? (
          <div className="flex justify-between border-b border-black py-1 ml-4">
            <span>Total Sugars {info.sugar || "0g"}</span>
            <span className="font-bold"></span>
          </div>
        ) : null}
        {info.protein !== undefined ? (
          <div className="flex justify-between border-b border-black py-1">
            <span>
              <span className="font-bold">Protein</span> {info.protein || "0g"}
            </span>
            <span className="font-bold"></span>
          </div>
        ) : null}
      </div>

      {/* Ingredients Section */}
      {info.ingredients?.length ? (
        <div className="mt-4 text-[11px] leading-tight">
          <span className="font-bold uppercase">Ingredients:</span>{" "}
          {info.ingredients.join(", ")}.
        </div>
      ) : null}
    </div>
  );
}
