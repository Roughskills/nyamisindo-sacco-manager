
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaceholderCardProps {
  title: string;
  description: string;
  featureName: string;
  buttonText: string;
}

const PlaceholderCard = ({ title, description, featureName, buttonText }: PlaceholderCardProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-green-800">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{featureName}</h3>
          <p className="text-gray-600 mb-6">{featureName} features coming soon</p>
          <Button className="bg-green-600 hover:bg-green-700">{buttonText}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderCard;
