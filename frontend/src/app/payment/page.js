"use client";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in";
import {
  useGetClientTokenQuery,
  useProcessPaymentMutation,
} from "@/services/api";
import { useToast } from "@/components/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
const course = {
  title: "Introduction to Php",
  description: "Php is very good landuage",
  isPublished: true,
  thumbnailUrl:
    "https://static.learnx.me/upload/instructor_6/course_12_thumbnail.jpg",
  price: 250,
  instructorName: "Arif Khan",
  instructorId: 6,
  category: {
    id: 2,
    name: "Design",
    description:
      "Learn the fundamentals of design and theory to create stunning visuals",
  },
  id: 12,
};
export default function Payment() {
  const [dropInInstance, setDropInInstance] = useState(null);
  const { toast } = useToast();
  // Fetch client token from the backend
  const { data: clientToken, isLoading, isError } = useGetClientTokenQuery();
  const [processPayment, { isLoading: paymentProcessing, isSuccess }] =
    useProcessPaymentMutation();

  // Initialize Drop-in UI
  useEffect(() => {
    if (clientToken) {
      DropIn.create({
        authorization: clientToken,
        container: "#dropin-container",
      })
        .then((instance) => setDropInInstance(instance))
        .catch((err) => console.error(err));
    }
  }, [clientToken]);

  const handlePayment = async () => {
    if (!dropInInstance) return;

    try {
      const { nonce } = await dropInInstance.requestPaymentMethod();
      const response = await processPayment({
        nonce,
        courseId: 4,
      });
      if (response.data.status === "failure") {
        toast({
          variant: "destructive",
          title: "Payment failed. Please try again",
          description:
            response.data.message ||
            "Failed to process payment. Please try again.",
        });
      } else {
        toast({
          variant: "success",
          title: "Payment successfull",
          description:
            response.data.message ||
            "Course Successfully created! Please add your content",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed. Please try again",
        description: "Failed to process payment. Please try again.",
      });
    }
  };


  if(!clientToken){
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row  px-4 py-8 m-auto max-w-7xl md:justify-center gap-5">
        <div className="md:w-[580px]">
          <h1 className="text-2xl">Payment Methods</h1>
          {!isSuccess ? (
              <div id="dropin-container"></div>
          ) : (
            <p>Payment Sucessfull</p>
          )}
        </div>
        <div className="md:w-[400px] p-6">
          <h1 className="text-3xl ">Order Summary</h1>
          <div className="mt-4 border-t pt-6">
            {/* Total */}
            <div className="flex justify-between">
              <p className="font-semibold">Total:</p>
              <p className="font-semibold text-xl">$250.00</p>
            </div>
          </div>
          {/* Complete Purchase Button */}
          <div className="mt-8">
            <p className="text-sm mb-1">
              By completing your purchase you agree to these{" "}
              <Button
                className="flex-inline p-0 gap-0 h-min"
                variant="link"
                size="sm"
              >
                Terms of Service
              </Button>
            </p>
            <Button onClick={handlePayment} loading={paymentProcessing} className="w-full" variant="default">
             {paymentProcessing ? <> </>  : <Lock />} Complete Purchase
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
