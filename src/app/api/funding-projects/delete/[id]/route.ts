import { connectDB } from "@/lib/connectDB";
import { FundProject } from "@/models/fundProjects";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const { id } = params;

    // Cari dulu proyek berdasarkan id
    const project = await FundProject.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Cek apakah proyek sudah dihapus sebelumnya
    if (project.deletedAt) {
      return NextResponse.json(
        { error: "Project already deleted" },
        { status: 400 }
      );
    }

    // Lakukan update deletedAt untuk soft delete
    project.deletedAt = new Date();
    await project.save();

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
