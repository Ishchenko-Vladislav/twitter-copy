// import { auth } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest, { params }: { params: { postId: string, commentId: string } }) {
//     try {
//         const postId = parseInt(params.postId);
//         const commentId = parseInt(params.postId);
//         const session = await auth();
//         if (!session?.user.id) {
//           return NextResponse.json({
//             success: false,
//             data: null,
//             message: "You should be logged in.",
//           });
//         }
//     } catch (error) {

//     }
// }
