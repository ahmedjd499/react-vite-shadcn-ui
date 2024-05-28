
import { Separator } from "@/components/ui/separator"
import PropTypes from "prop-types";

export function LineWithText({text}) {
  return (
    (<div className="flex items-center my-6">
      <Separator className="flex-1" />
      <div className="px-4 text-gray-500 dark:text-gray-400 font-medium">{text}</div>
      <Separator className="flex-1" />
    </div>)
  );
}


LineWithText.propTypes = {
  text: PropTypes.string
};