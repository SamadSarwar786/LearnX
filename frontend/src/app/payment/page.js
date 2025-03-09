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
import { getCourseById } from "@/store/slices/coursesSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
export default function Payment() {
  const [dropInInstance, setDropInInstance] = useState(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId"); // Check if the router is ready
  // Use useSelector only after router.query is available
  const course = useSelector((state) => getCourseById(state, courseId));

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
        courseId,
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

  if (!clientToken) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={"large"} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row px-4 py-8 m-auto max-w-7xl md:justify-center gap-5 min-h-screen">
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
              <p className="font-semibold text-xl">₹{course.price}</p>
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
            <Button
              onClick={handlePayment}
              loading={paymentProcessing}
              className="w-full"
              variant="default"
            >
              {paymentProcessing ? <> </> : <Lock />} Complete Purchase
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
